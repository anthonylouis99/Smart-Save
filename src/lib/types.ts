export type sizeType = "xs" | "sm" | "md" | "lg" ;

export const paymentCalendar = [
  // 'one_time',
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "bi_annually",
  "yearly",
] as const;

export type PaymentCalendar = (typeof paymentCalendar)[number];

export type PaymentCalendarSelectType = {
  value: PaymentCalendar;
  label: string;
}[];

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

export type ConvertSnakeToCamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K] extends object
    ? ConvertSnakeToCamelCase<T[K]> // Recursively apply the transformation to nested objects
    : T[K];
};

export type SnakeToCamelCaseNested<T> = T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<
        T[K]
      >;
    }
  : T;

export type PaginatedResponseData<T> = {
  data: T[];
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
  total: number;
};

export type GetRecordType<T> = T extends (infer U)[] ? U : never;

export type PayloadCustomFields = {
  displayName: string;
  variableName: string;
  value: string;
};

export type OprionalBaseType<T> = T & {};
