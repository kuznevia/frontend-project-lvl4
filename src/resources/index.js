const resources = {
  ru: {
    translation: {
      errors: {
        connectionFailed: 'Ошибка соединения',
        userExists: 'Такой пользователь уже существует',
        emptyName: 'Имя канала не может быть пустым',
        uniqueName: 'Имя канала должно быть уникальным',
        fourzerofour: '404 - Страница не найдена',
        notCorrectNameOrPassword: 'Неверные имя пользователя или пароль',
        numberOfSymbols: 'От 3 до 20 символов',
        passwordsShouldBeEqual: 'Пароли должны совпадать',
        minimumNumberOfSymbols: 'Не менее 6 символов',
      },
      actions: {
        send: 'Отправить',
        cancel: 'Отменить',
        delete: 'Удалить',
        rename: 'Переименовать',
        logout: 'Выйти',
        registr: 'Зарегистрироваться',
      },
      modalLabels: {
        deleteСhannel: 'Удалить канал',
        youSure: 'Уверены?',
        setNewChannelName: 'Задайте новое имя каналу',
        addNewChannel: 'Добавить новый канал',
        channelName: 'Имя канала',
        manageChannel: 'Управление каналом',
      },
      loginLabels: {
        login: 'Войти',
        yourNick: 'Ваш ник',
        password: 'Пароль',
        noAccount: 'Нет аккаунта? ',
        registration: 'Регистрация',
      },
      navLabels: {
        hexletChat: 'Hexlet Chat',
      },
      registrationLabels: {
        registration: 'Регистрация',
        nickName: 'Имя пользователя',
        password: 'Пароль',
        passwordCornfirmation: 'Подтвердите пароль',
      },
      notFoundLabels: {
        home: 'Перейти на стартовую страницу',
      },
      chatLabels: {
        channels: 'Каналы',
        messages: 'Сообщений',
      },
      toastLabels: {
        channelAdded: 'Канал создан',
        channelRemoved: 'Канал удалён',
        channelRenamed: 'Канал переименован',
      },
    },
  },
};

export default resources;
