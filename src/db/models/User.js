/**
 * 작성자 - 김지유
 * Users Model 정의.
 * Users : AccountBooks = 1 : N
 */
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
        comment: '사용자 id',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        comment: '사용자 이메일',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '사용자 비밀번호',
      },
    },
    {
      charset: 'utf8', // 한국어 설정
      collate: 'utf8_general_ci', // 한국어 설정
      tableName: 'Users', // 테이블 이름 정의
      timestamps: true, // createAt, updateAt 활성화
      paranoid: true, // deleteAt 옵션
    },
  );

  Users.associate = models => {
    const { AccountBooks } = models;

    Users.hasMany(AccountBooks, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return Users;
};
