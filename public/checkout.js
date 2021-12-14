(function () {
    "use strict";

    // This is a public sample test API key.
    // To avoid exposing it, don't submit any personally identifiable information through requests with this API key.
    // Sign in to see your own test API key embedded in code samples.
    const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

    // The items the customer wants to buy
    const items = [{ cents: 100 }];

    let elements;

    initialize();
    checkStatus();

    document
        .querySelector(".js-payment-form")
        .addEventListener("submit", handleSubmit);

    // Fetches a payment intent and captures the client secret
    async function initialize() {
        const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
        });
        const { clientSecret } = await response.json();

        const appearance = {
            theme: "stripe",
        };
        elements = stripe.elements({ appearance, clientSecret });

        const paymentElement = elements.create("payment");
        paymentElement.mount(".js-payment-element");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                // ex: http://localhost:4242
                return_url: document.location.href,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            showMessage(error.message);
        } else {
            showMessage("An unexpected error occured.");
        }

        setLoading(false);
    }

    // Fetches the payment intent status after payment submission
    async function checkStatus() {
        console.log("checking status...");

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            console.info("no client secret");
            return;
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(
            clientSecret
        );

        switch (paymentIntent.status) {
            case "succeeded":
                showMessage("Payment succeeded!");
                break;
            case "processing":
                showMessage("Your payment is processing.");
                break;
            case "requires_payment_method":
                showMessage(
                    "Your payment was not successful, please try again."
                );
                break;
            default:
                showMessage("Something went wrong.");
                break;
        }
    }

    // ------- UI helpers -------

    function showMessage(messageText) {
        const messageContainer = document.querySelector(".js-payment-message");

        messageContainer.classList.remove("hidden");
        messageContainer.textContent = messageText;

        setTimeout(function () {
            messageContainer.classList.add("hidden");
            messageText.textContent = "";
        }, 4000);
    }

    // Show a spinner on payment submission
    function setLoading(isLoading) {
        if (isLoading) {
            // Disable the button and show a spinner
            document.querySelector(".js-submit").disabled = true;
            document.querySelector(".js-spinner").classList.remove("hidden");
            document.querySelector(".js-button-text").classList.add("hidden");
        } else {
            document.querySelector(".js-submit").disabled = false;
            document.querySelector(".js-spinner").classList.add("hidden");
            document
                .querySelector(".js-button-text")
                .classList.remove("hidden");
        }
    }
})();
