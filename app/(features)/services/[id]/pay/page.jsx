'use client';
import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {createClient} from "@/utils/supabase/client"
import {useCitizenContext} from "@/app/context/CitizenContext";
import { useRouter } from 'next/navigation';

import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { set } from 'date-fns';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// 4242 4242 4242 4242
// 12 / 34
// 123
// 12345
function CheckoutForm({ service, request }) {
    
  const {citizenId} = useCitizenContext();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [clientSecret, setClientSecret] = useState(null);
  const [modalType, setModalType] = useState(null); 

  const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter()
  const amount = service?.total_price * 100;

  useEffect(() => {
    if (!amount) return;

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
        // setSuccessMessage("Payment successful!");
        // setModalType("success");
        console.log("this is the request", citizenId);
        console.log("this is the service", service.id);
        const supabase = createClient();
        const { data, error } = await supabase
        .from("Requests")
        .update({
            is_paid: true,
            status: "Ongoing",
        })
        .eq("customer_id", request.customer_id)
        .eq("service_id", service.id).select();  
        
        if (error) {
            console.error("Update error:", error);
            throw new Error("Payment update failed");
        }
        setMessage('Payment Successful!');
        console.log("Update success:", data);
        setTimeout(() => {
            router.push("/tracker");
        }, 3000); // waits 3 seconds
                  
      // You can call a Supabase update here using request.id

    }
  };

  return (
    <>
    {modalType === "success" && (
        <SuccessModal
          message={successMessage}
          setShowModal={setModalType}
        />
      )}
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">{service?.title}</h2>
      <CardElement className="p-4 border rounded" />
      
            	<p className="text-sm mb-4 text-black">Agreement Fee:  <span className="font-bold">₱{service.agreement_fee}</span> </p>
            	<p className="text-sm mb-4 text-black">Convenience Fee:  <span className="font-bold">₱{service.convenience_fee}</span> </p>
            	<p className="text-sm mb-4 text-black">Total Fee: </p>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={!stripe || !clientSecret}
      >
        Pay ₱{service?.total_price}
      </button>
       
      {message && <div className="mt-4">{message}</div>}
    </form>
    </>
  );
}

export default function PayPage() {
  const { id: serviceId } = useParams();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId');
    console.log('Service ID:', serviceId);
    console.log('Request ID:', requestId);
  const [service, setService] = useState(null);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resService = await fetch(`/api/services/${serviceId}`);
      const dataService = await resService.json();
      setService(dataService);

      const resRequest = await fetch(`/api/request/${requestId}`);
      const dataRequest = await resRequest.json();
      setRequest(dataRequest.requests);
      console.log('Fetched Request:', dataRequest.requests);
        console.log('Fetched Service:', dataService);
    };
    if (serviceId && requestId) fetchData();
  }, [serviceId, requestId]);

  if (!service || !request) return <div className="p-6">Loading...</div>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm service={service} request={request} />
    </Elements>
  );
}
