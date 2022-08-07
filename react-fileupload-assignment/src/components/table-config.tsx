

export const columns: Column[] = [
    { id: 'invoiceNo', label: 'Invoice No', minWidth: 100 },
    { id: 'stockCode', label: 'Stock Code', minWidth: 100 },
    {
      id: 'description',
      label: 'Description',
      minWidth: 130,
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'invoiceDate',
      label: 'Invoice Date',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'quantity',
      label: 'Quantity',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'unitPrice',
      label: 'Unit Price',
      minWidth: 100,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'customerId',
      label: 'Customer Id',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'country',
      label: 'Country',
      minWidth: 100,
      align: 'right',
    },
  ];


  export interface Column {
    id: 'invoiceId' | 'invoiceNo' | 'stockCode' | 'description' | 'invoiceDate' | 'quantity' | 'unitPrice' | 'customerId' | 'country';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }