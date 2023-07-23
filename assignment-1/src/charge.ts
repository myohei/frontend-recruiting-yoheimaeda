export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

type PaymentType = 'CASH' | 'COUPON';
export type Payment = {
  type: PaymentType;
  percentage?: number;
  amount?: number;
};

class Deposits {
  private readonly _deposits: Map<PaymentType, number> = new Map<PaymentType, number>()

  add(type: PaymentType, amount: number) {
    this._deposits.set(type, (this._deposits.get(type) || 0) + amount)
  }

  has(type: PaymentType) {
    return this._deposits.has(type)
  }

  hasOnly(type: PaymentType) {
    return [...this._deposits.keys()].every(t => t === type)
  }

  amount(type: PaymentType) {
    return this._deposits.get(type) || 0
  }

  total(): number {
    return [...this._deposits.entries()].reduce((acc, d) => {
      return acc + d[1]
    }, 0)
  }
}

// 金額が不足しているとエラー
class TotalDepositSpecification {
  isSatisfied(deposits: Deposits, total: number) {
    return deposits.total() >= total;
  }
}

// クーポンで全額払える場合に現金も含まれていればエラー
class CouponOverChargeSpecification {
  isSatisfied(deposits: Deposits, total: number) {
    if (deposits.hasOnly('CASH') || deposits.hasOnly('COUPON')) {
      return true;
    }
    return deposits.amount('COUPON') < total;
  }
}

export function charge(invoice: Invoice, payments: Payment[]) {
  const total = invoice.total;
  const deposits = payments
    .sort((payment) => (payment.type !== 'CASH' ? -1 : 1))
    .reduce((dep, payment) => {
      const type = payment.type
      dep.add(type, getAmount(payment, total))
      return dep
    }, new Deposits());
  if (!new CouponOverChargeSpecification().isSatisfied(deposits, total)) {
    throw new Error('OverCharge');
  }
  if (!new TotalDepositSpecification().isSatisfied(deposits, total)) {
    throw new Error('Shortage');
  }
  const totalDeposit = deposits.total()
  if (deposits.hasOnly('COUPON')) {
    return {total, deposit: totalDeposit, change: 0};
  }
  return {total: total, deposit: totalDeposit, change: totalDeposit - total};
}

function getAmount(payment: Payment, total: number): number {
  if (payment.type === 'COUPON' && payment.percentage) {
    return Math.floor(total * (payment.percentage / 100));
  }
  return payment.amount || 0;
}
