const { createAccountBookSchema } = require('./accountBook.schema');
const { ValidationError } = require('joi');

const options = {
  abortEarly: false,
};

describe('AccountBookSchema', () => {
  it('모두 입력', async () => {
    const body = {
      date: new Date(),
      type: 'income',
      amount: 2000,
      memo: 'memo',
    };

    const value = await createAccountBookSchema.validateAsync(body, options);

    expect(value).toEqual(body);
  });

  it('메모 미입력', async () => {
    const body = {
      date: new Date(),
      type: 'income',
      amount: 2000,
    };

    const value = await createAccountBookSchema.validateAsync(body, options);

    expect(value).toEqual(body);
  });

  it('금액 공백', async () => {
    const body = {
      date: new Date(),
      type: 'income',
      amount: '',
      memo: 'memo',
    };

    const maybeErrorFunction = async () => {
      try {
        await createAccountBookSchema.validateAsync(body, options);
      } catch (err) {
        throw err;
      }
    };

    await expect(maybeErrorFunction).rejects.toBeInstanceOf(ValidationError);
  });

  it('금액 미입력', async () => {
    const body = {
      date: new Date(),
      type: 'income',
      memo: 'memo',
    };

    const maybeErrorFunction = async () => {
      try {
        await createAccountBookSchema.validateAsync(body, options);
      } catch (err) {
        throw err;
      }
    };

    await expect(maybeErrorFunction).rejects.toBeInstanceOf(ValidationError);
  });

  it('가계부 타입 공백', async () => {
    const body = {
      date: new Date(),
      type: '',
      amount: 2000,
      memo: 'memo',
    };

    const maybeErrorFunction = async () => {
      try {
        await createAccountBookSchema.validateAsync(body, options);
      } catch (err) {
        throw err;
      }
    };

    await expect(maybeErrorFunction).rejects.toBeInstanceOf(ValidationError);
  });

  it('가계부 타입 오타', async () => {
    const body = {
      date: new Date(),
      type: 'expenses',
      amount: 2000,
      memo: 'memo',
    };

    const maybeErrorFunction = async () => {
      try {
        await createAccountBookSchema.validateAsync(body, options);
      } catch (err) {
        throw err;
      }
    };

    await expect(maybeErrorFunction).rejects.toBeInstanceOf(ValidationError);
  });

  it('가계부 타입 미입력', async () => {
    const body = {
      date: new Date(),
      amount: 2000,
      memo: 'memo',
    };

    const maybeErrorFunction = async () => {
      try {
        await createAccountBookSchema.validateAsync(body, options);
      } catch (err) {
        throw err;
      }
    };

    await expect(maybeErrorFunction).rejects.toBeInstanceOf(ValidationError);
  });

  it('일시 미입력', async () => {
    const body = {
      type: 'income',
      amount: 2000,
      memo: 'memo',
    };

    const value = await createAccountBookSchema.validateAsync(body, options);

    expect(value).toEqual(body);
  });
});
