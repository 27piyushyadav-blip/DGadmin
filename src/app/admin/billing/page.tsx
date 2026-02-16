"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, TrendingUp, Calendar, Download, CheckCircle, AlertTriangle, Crown, Zap, Shield } from "lucide-react";

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$49",
      period: "month",
      description: "Perfect for small businesses",
      features: [
        "Up to 100 experts",
        "1,000 bookings/month",
        "Basic analytics",
        "Email support",
        "Standard security"
      ],
      limitations: [
        "No custom branding",
        "Basic reporting only",
        "No API access"
      ],
      current: false,
      popular: false
    },
    {
      id: "professional",
      name: "Professional",
      price: "$149",
      period: "month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 500 experts",
        "10,000 bookings/month",
        "Advanced analytics",
        "Priority support",
        "Enhanced security",
        "Custom branding",
        "API access",
        "Advanced reporting"
      ],
      limitations: [],
      current: true,
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited experts",
        "Unlimited bookings",
        "White-label solution",
        "Dedicated support",
        "Enterprise security",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee",
        "Custom features"
      ],
      limitations: [],
      current: false,
      popular: false
    }
  ];

  const billingHistory = [
    {
      id: "INV-2024-001",
      date: "2024-01-20",
      amount: "$149.00",
      status: "paid",
      plan: "Professional",
      method: "Credit Card ending in 4242"
    },
    {
      id: "INV-2024-002",
      date: "2023-12-20",
      amount: "$149.00",
      status: "paid",
      plan: "Professional",
      method: "Credit Card ending in 4242"
    },
    {
      id: "INV-2024-003",
      date: "2023-11-20",
      amount: "$149.00",
      status: "paid",
      plan: "Professional",
      method: "Credit Card ending in 4242"
    }
  ];

  const usageStats = {
    experts: {
      used: 127,
      limit: 500,
      percentage: 25.4
    },
    bookings: {
      used: 3421,
      limit: 10000,
      percentage: 34.21
    },
    storage: {
      used: 2.4,
      limit: 10,
      percentage: 24
    },
    api: {
      used: 45000,
      limit: 100000,
      percentage: 45
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing & Plans</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription, billing, and usage
        </p>
      </div>

      {/* Current Plan Overview */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Crown className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Professional Plan</h2>
              <Badge className="bg-white/20 text-white">Active</Badge>
            </div>
            <p className="text-primary-foreground/80 mb-1">
              $149/month • Billed monthly
            </p>
            <p className="text-sm text-primary-foreground/70">
              Next billing date: February 20, 2024
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">$149</p>
            <p className="text-sm text-primary-foreground/80">per month</p>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Current Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(usageStats).map(([key, stats]) => (
            <div key={key} className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium capitalize">
                  {key === 'experts' && 'Experts'}
                  {key === 'bookings' && 'Bookings'}
                  {key === 'storage' && 'Storage (GB)'}
                  {key === 'api' && 'API Calls'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stats.used} / {stats.limit}
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    stats.percentage > 80 ? 'bg-red-500' : 
                    stats.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(stats.percentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.percentage.toFixed(1)}% used
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Plans */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Available Plans</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-card rounded-lg border border-border p-6 relative ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Zap className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Current
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h4>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{limitation}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-2 rounded-lg transition-colors ${
                  plan.current 
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border hover:bg-accent'
                }`}
                disabled={plan.current}
                onClick={() => !plan.current && setSelectedPlan(plan.id)}
              >
                {plan.current ? 'Current Plan' : 'Upgrade Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Credit Card ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
            </div>
          </div>
          <button className="text-sm text-primary hover:underline">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
          <button className="text-sm text-primary hover:underline flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download All
          </button>
        </div>
        
        <div className="space-y-3">
          {billingHistory.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date} • {invoice.plan}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{invoice.amount}</p>
                <p className="text-sm text-muted-foreground">{invoice.method}</p>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  {invoice.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
