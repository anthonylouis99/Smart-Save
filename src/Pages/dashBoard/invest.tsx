import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/common/Button/Button";
// import Input from "../../components/Input/Input";
import { DashboardHeader } from "../../components/Headers/dashBoardHeader";

// Define schema for validation
const investSchema = z.object({
  amount: z
    .number( "Enter a valid number" )
    .positive("Amount must be greater than 0")
    .max(1000000, "Amount too large")
});

type InvestForm = z.infer<typeof investSchema>;

type InvestmentOption = {
  id: string;
  name: string;
  interestRate: number; 
  price:number;
};

const investmentOptions: InvestmentOption[] = [
  { id: "1", name: "TechGrow Inc.", interestRate: 8,price:20000 },
  { id: "2", name: "GreenFuture Energy", interestRate: 6.5,price:10000 },
  { id: "3", name: "SafeBank Corp.", interestRate: 4,price:10000  },
  { id: "4", name: "AgroLife Ltd.", interestRate: 7 ,price:10000 },
];

export default function Investment() {
  const [selected, setSelected] = useState<string | null>(null);

  const {

    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InvestForm>({
    resolver: zodResolver(investSchema),
    defaultValues: { amount: 0 }
  });

  const amount = watch("amount");

  const handleInvest = (company: InvestmentOption) => {
    setSelected(company.id);
    console.log(
      `Invested ${amount} in ${company.name} at ${company.interestRate}%`
    );
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <DashboardHeader title={"Investments"}/>

      <form
        onSubmit={handleSubmit(() => {})}
        className="space-y-4"
      >
        {investmentOptions.map((company) => {
         const potentialReturn =
  company.price > 0
    ? (company.price * (company.interestRate / 100) + company.price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";
          return (
            <div
              key={company.id}
              className="flex items-center justify-between border p-4 rounded-xl shadow-sm"
            >
              <div className="flex flex-col gap-1">
               
                <span className="font-medium">{company.name}</span>
                <span className="text-sm text-gray-500">
                  Interest Rate: {company.interestRate}%
                </span>
                 <span className="text-sm">
                  Price: 
                  <span className="font-semibold text-green-600">
                    ₦ {company.price.toLocaleString("en-US")}
                  </span>
                </span>

                <span className="text-sm">
                  Potential Return: 
                  <span className="font-semibold text-green-600">
                       ₦ {potentialReturn}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={() => handleInvest(company)}
                >
                  Invest
                </Button>
              </div>
            </div>
          );
        })}
      </form>

      {errors.amount && (
        <p className="text-red-500 text-sm">{errors.amount.message}</p>
      )}

      {selected && (
        <div className="p-4 border rounded-lg bg-green-50">
          ✅ Successfully invested in
          <strong>
            {investmentOptions.find((c) => c.id === selected)?.name}
          </strong>
        </div>
      )}
    </div>
  );
}
