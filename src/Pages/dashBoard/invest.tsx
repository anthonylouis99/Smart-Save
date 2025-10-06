import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/common/Button/Button";
import Input from "../../components/Input/Input";

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
  interestRate: number; // %
};

const investmentOptions: InvestmentOption[] = [
  { id: "1", name: "TechGrow Inc.", interestRate: 8 },
  { id: "2", name: "GreenFuture Energy", interestRate: 6.5 },
  { id: "3", name: "SafeBank Corp.", interestRate: 4 },
  { id: "4", name: "AgroLife Ltd.", interestRate: 7 },
];

export default function Investment() {
  const [selected, setSelected] = useState<string | null>(null);

  const {
    register,
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
      <h1 className="text-2xl font-bold">Choose Your Investment</h1>

      <form
        onSubmit={handleSubmit(() => {})}
        className="space-y-4"
      >
        {investmentOptions.map((company) => {
          const potentialReturn =
            amount > 0 ? (amount * (company.interestRate / 100)).toFixed(2) : "0.00";

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
                  Potential Return:{" "}
                  <span className="font-semibold text-green-600">
                    ${potentialReturn}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  placeholder="Amount"
                  className="w-28"
                  {...register("amount", { valueAsNumber: true })}
                />
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
          ✅ Successfully invested in{" "}
          <strong>
            {investmentOptions.find((c) => c.id === selected)?.name}
          </strong>
        </div>
      )}
    </div>
  );
}
