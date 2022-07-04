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
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        comment: '가계부 기입 날짜',
      },
      expenses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '지출',
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
      sourceKey: 'id',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return AccountBooks;
};
