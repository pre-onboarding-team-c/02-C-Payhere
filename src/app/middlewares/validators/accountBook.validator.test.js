const {
  createAccountBookValidator,
  updateAccountBookValidator,
  accountBookIdValidator,
} = require('./accountBook.validator');
const { v1, v4 } = require('uuid');

describe('AccountBookValidator', () => {
  it('createAccountBookValidator Resolved', async () => {
    const req = {
      body: {
        date: new Date(),
        type: 'income',
        amount: 2000,
        memo: 'memo',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await createAccountBookValidator(req, res, next);

    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('createAccountBookValidator Rejected', async () => {
    const req = {
      body: {
        date: new Date(),
        type: 'expenses',
        amount: 2000,
        memo: 'memo',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await createAccountBookValidator(req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      code: 400,
      message: '"type" must be one of [income, expense]',
    });
    expect(next).toBeCalledTimes(1);
  });

  it('updateAccountBookValidator Resolved', async () => {
    const req = {
      body: {
        date: new Date(),
        type: 'income',
        amount: 2000,
        memo: 'memo',
      },
      params: { accountBookId: v4() },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await updateAccountBookValidator(req, res, next);

    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('updateAccountBookValidator Rejected', async () => {
    const req = {
      body: {
        date: new Date(),
        type: 'expenses',
        amount: 2000,
        memo: 'memo',
      },
      params: { accountBookId: v4() },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await updateAccountBookValidator(req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      code: 400,
      message: '"type" must be one of [income, expense]',
    });
    expect(next).toBeCalledTimes(1);
  });

  it('accountBookIdValidator Resolved', async () => {
    const req = {
      params: { accountBookId: v4() },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await accountBookIdValidator(req, res, next);

    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('accountBookIdValidator Rejected', async () => {
    const req = {
      params: { accountBookId: v1() },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await accountBookIdValidator(req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      code: 400,
      message: '"value" must be a valid GUID',
    });
    expect(next).toBeCalledTimes(1);
  });
});
