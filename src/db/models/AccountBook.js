/**
 * 작성자 - 김지유
 * AccountBooks Model 정의.
 * Users : AccountBooks = 1 : N
 */
module.exports = (sequelize, DataTypes) => {
  const AccountBooks = sequelize.define(
    'AccountBooks',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '가계부 id',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        comment: '사용자 id',
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        comment: '가계부 기입 날짜',
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['income', 'expense']],
        },
        comment: '가계부 소비/지출',
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '금액',
      },
      memo: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '메모',
      },
    },
    {
      charset: 'utf8', // 한국어 설정
      collate: 'utf8_general_ci', // 한국어 설정
      tableName: 'AccountBooks', // 테이블 이름 정의
      timestamps: true, // createAt, updateAt 활성화
      paranoid: true, // deleteAt 옵션
    },
  );

  AccountBooks.associate = models => {
    const { Users } = models;

    AccountBooks.belongsTo(Users, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return AccountBooks;
};
