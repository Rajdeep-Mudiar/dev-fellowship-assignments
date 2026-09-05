import React from "react";
import { X, CheckCircle, Clock, Truck, Package, ShieldCheck, MapPin } from "lucide-react";

const OrderTrackingModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const steps = [
    { title: "Order Placed", desc: "Received & Confirmed", icon: CheckCircle },
    { title: "Processing", desc: "Handpicked from farm hub", icon: Package },
    { title: "Out for Delivery", desc: "Rider on the way", icon: Truck },
    { title: "Delivered", desc: "Handed over fresh", icon: ShieldCheck },
  ];

  const getActiveStep = () => {
    switch (order.status) {
      case "Order Placed":
        return 0;
      case "Processing":
        return 1;
      case "Out for Delivery":
        return 2;
      case "Delivered":
        return 3;
      case "Cancelled":
        return -1;
      default:
        return 0;
    }
  };

  const activeStep = getActiveStep();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden z-10 animate-fade-in">
        <div className="bg-linear-to-r from-emerald-800 to-teal-900 p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-emerald-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full">
                Live Status
              </span>
              <span className="text-xs text-emerald-200">
                Order #{order._id?.substring(order._id.length - 8).toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-black tracking-tight mt-1">
              {order.status === "Delivered"
                ? "Groceries Delivered!"
                : "Delivery in ~25-30 Mins"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Tracker Steps */}
          <div className="space-y-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = activeStep >= idx;
              const isCurrent = activeStep === idx;

              return (
                <div key={idx} className="flex items-start gap-4 relative">
                  {idx < steps.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 bottom-0 w-0.5 -mb-6 ${
                        activeStep > idx ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}

                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 transition ${
                      isCompleted
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    } ${isCurrent ? "ring-4 ring-emerald-500/20" : ""}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          isCompleted ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Details Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-gray-200/70 text-xs space-y-2">
            <div className="flex items-start gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900">Destination:</span>{" "}
                {order.address?.street}, {order.address?.city}, {order.address?.zipcode}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-gray-600">
              <span>
                Payment: <strong className="text-gray-900">{order.paymentType}</strong> (
                {order.isPaid ? (
                  <span className="text-emerald-600 font-bold">Paid</span>
                ) : (
                  <span className="text-amber-600 font-bold">Pay on delivery</span>
                )}
                )
              </span>
              <span className="font-bold text-gray-900 text-sm">
                Total: ₹{order.amount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;
