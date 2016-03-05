interface AccountOptions {
  credits?: number;
}

export default class Account {
  private credits: number;

  constructor(options: AccountOptions) {
    this.credits = options.credits || 0;
  }

  transfer(target: Account, amount: number): boolean {
    if (this.credits < amount) {
      return false;
    }

    target.credits += amount;
    this.credits -= amount;
    return true;
  }
}
