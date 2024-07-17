#Data Flow and Interaction
Creating a Payment: Client sends payment details -> API Gateway -> Payment Gateway Service -> Database.
Processing a Payment: Payment Gateway Service calls Payment Processor Module -> Updates Payment Status -> Records Transaction.
Retrieving Payment Status: Client requests status -> API Gateway -> Payment Gateway Service -> Database -> Returns Status.
Handling Refunds: Client requests refund -> API Gateway -> Payment Gateway Service -> Calls Payment Processor -> Updates Payment and Transaction Status.


##API Design
POST /payments: Create a payment.

Request Body: { "user_id": 1, "amount": 100.00, "currency": "USD", "payment_method": "credit_card" }
Response: { "payment_id": 1, "status": "pending" }
POST /payments/
/process: Process a payment.

Request Params: payment_id
Response: { "payment_id": 1, "status": "processed", "transaction_id": 1 }
GET /payments/
: Retrieve payment status.

Request Params: payment_id
Response: { "payment_id": 1, "status": "processed" }
POST /payments/
/refund: Handle refunds.

Request Params: payment_id
Response: { "payment_id": 1, "status": "refunded", "transaction_id": 2 }
