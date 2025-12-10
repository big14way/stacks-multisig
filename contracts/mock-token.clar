(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))

;; No maximum supply!
(define-fungible-token mock-token)

;; Clarity 4 Features
;; Get contract hash - Clarity 4 feature
(define-read-only (get-contract-hash)
  (ok (contract-hash? .mock-token-v4))
)

;; Verify contract integrity - Clarity 4 feature
(define-read-only (verify-contract-integrity)
  (match (contract-hash? .mock-token-v4)
    hash-value (ok true)
    error-val (ok false)
  )
)

;; Get current block height - Clarity 4 feature
(define-read-only (get-current-block-height)
  (ok stacks-block-height)
)

;; Convert amount to ASCII string - Clarity 4 feature using to-ascii?
(define-read-only (amount-to-string (amount uint))
  (to-ascii? amount)
)

(define-public (transfer
        (amount uint)
        (sender principal)
        (recipient principal)
        (memo (optional (buff 34)))
    )
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (try! (ft-transfer? mock-token amount sender recipient))
        (match memo
            to-print (print to-print)
            0x
        )
        (ok true)
    )
)

(define-read-only (get-name)
    (ok "Mock Token")
)

(define-read-only (get-symbol)
    (ok "MT")
)

(define-read-only (get-decimals)
    (ok u6)
)

(define-read-only (get-balance (who principal))
    (ok (ft-get-balance mock-token who))
)

(define-read-only (get-total-supply)
    (ok (ft-get-supply mock-token))
)

(define-read-only (get-token-uri)
    (ok none)
)

(define-public (mint
        (amount uint)
        (recipient principal)
    )
    (ft-mint? mock-token amount recipient)
)
