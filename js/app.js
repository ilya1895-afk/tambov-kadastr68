(function () {
  'use strict';

  const ACTIVE_CLASS = 'nav__tab--active';

  const AUTH_USER_KEY = 'tambov_kadastr_auth_user_v1';
  const AUTH_LAST_USER_KEY = 'tambov_kadastr_auth_last_user_v1';
  const PENDING_TOAST_KEY = 'tambov_kadastr_pending_toast_v1';
  const USERS_DB_KEY = 'tambov_kadastr_users_db_v1';
  const REQUEST_OVERRIDES_KEY = 'tambov_kadastr_request_overrides_v1';

  var USERS_SEED = [
    {
      id: 'u1',
      shortName: 'Иванов И. И.',
      fio: 'Иванов Иван Иванович',
      role: 'Специалист отдела кадастрового учёта',
      dept: 'Управление Росреестра по Тамбовской области',
      empId: 'ТК-0847',
      phone: '+7 (4752) 12-34-56',
      ext: '124',
      email: 'ivanov.ii@tambov-kadastr.ru',
      hireDate: '15.03.2020',
      auth: { username: 'ivanov', password: 'ivanov123' },
      telecom: {
        tariff: 'Корпоративный «Кадастр»',
        monthlyFee: '350 ₽/мес',
        nextChargeDate: '28.02.2025',
        minutesPerMonth: 500,
        gbPerMonth: 25,
        minutesRemaining: 312,
        gbRemaining: 18.2,
        simConnectDate: '01.09.2023',
        simNumber: '+7 (4752) 123-45-56'
      },
      requests: {
        accepted: [
          {
            id: 'a-1',
            num: '1',
            type: 'Межевание земельного участка',
            settlement: 'г. Тамбов',
            date: '10.02.2025',
            status: 'Выполнена',
            completedDate: '24.02.2025',
            result: 'Подготовлен межевой план. Границы согласованы, замечаний нет.',
            workReport: 'Проведён анализ исходных данных, выполнены необходимые измерения, подготовлен межевой план и комплект материалов. Согласование границ завершено, данные проверены перед передачей.',
            employeeComment: 'В процессе уточнили контакт заявителя для согласования. Рекомендуется при следующем обращении сразу приложить копии правоустанавливающих документов.',
            coords: [52.7317, 41.4433],
            person: { fio: 'Петров Сергей Николаевич', phone: '+7 (4752) 55-12-34', email: 'petrov.sn@mail.ru', address: 'г. Тамбов, ул. Советская, д. 45, кв. 12' }
          },
          {
            id: 'a-2',
            num: '2',
            type: 'Кадастровый учёт изменений',
            settlement: 'п. Строитель',
            date: '08.02.2025',
            status: 'Выполнена',
            completedDate: '26.02.2025',
            result: 'Сверка сведений с ЕГРН выполнена, подготовлены материалы для оформления изменений.',
            workReport: 'Запрошены исходные сведения из ЕГРН, выполнена сверка с документами заявителя. Подготовлены сведения для формирования заявления об учёте изменений.',
            employeeComment: 'Замечаний по комплекту не поступало. Ожидается подписание уведомления о согласовании границ.',
            coords: [52.5333, 41.4333],
            person: { fio: 'Козлова Мария Ивановна', phone: '+7 (910) 123-45-67', email: 'kozlova.mi@gmail.com', address: 'Тамбовская обл., Тамбовский р-н, п. Строитель, ул. Центральная, д. 8' }
          },
          {
            id: 'a-3',
            num: '3',
            type: 'Постановка на кадастровый учёт',
            settlement: 'с. Тулиновка',
            date: '05.02.2025',
            status: 'Выполнена',
            completedDate: '27.02.2025',
            result: 'Проект заявления согласован с заявителем, формируется электронный пакет.',
            workReport: 'Проверены правоустанавливающие документы, согласованы реквизиты объекта. Начата подготовка электронного пакета для подачи в Росреестр.',
            employeeComment: 'Дозапрошена актуальная выписка из ПЗЗ. После получения пакет будет завершён и направлен в работу.',
            coords: [52.8167, 41.6167],
            person: { fio: 'Сидоров Алексей Викторович', phone: '+7 (920) 234-56-78', email: 'sidorov.av@yandex.ru', address: 'Тамбовская обл., Тамбовский р-н, с. Тулиновка, ул. Садовая, д. 3' }
          },
          {
            id: 'a-4',
            num: '4',
            type: 'Актуализация сведений ЕГРН',
            settlement: 'г. Моршанск',
            date: '03.02.2025',
            status: 'Выполнена',
            completedDate: '22.02.2025',
            result: 'Сведения актуализированы, подготовлено уведомление для заявителя.',
            workReport: 'Проведена сверка данных объекта с архивными материалами и текущей выпиской ЕГРН. Подготовлены корректировки и сформирован комплект для передачи в реестр.',
            employeeComment: 'Заявителю разъяснены изменения по площади и назначению. Дополнительных замечаний не поступало.',
            coords: [53.4436, 41.8106],
            person: { fio: 'Зайцев Артём Олегович', phone: '+7 (920) 333-44-55', email: 'zaitsev.ao@mail.ru', address: 'г. Моршанск, ул. Ленина, д. 2' }
          },
          {
            id: 'a-5',
            num: '5',
            type: 'Подготовка технического плана',
            settlement: 'пгт. Новая Ляда',
            date: '01.02.2025',
            status: 'Выполнена',
            completedDate: '21.02.2025',
            result: 'Технический план сформирован и передан на внутреннюю проверку.',
            workReport: 'Выполнен анализ исходных документов, проведены контрольные расчёты, сформированы разделы техплана и графическая часть. Пакет подготовлен в электронном виде.',
            employeeComment: 'Для ускорения подачи рекомендовано заранее подготовить доверенность на представителя.',
            coords: [52.6017, 41.6314],
            person: { fio: 'Никитина Елена Петровна', phone: '+7 (4752) 48-90-12', email: 'nikitina.ep@inbox.ru', address: 'Тамбовская обл., Тамбовский р-н, пгт. Новая Ляда, пер. Молодёжный, д. 15' }
          }
        ],
        pending: [
          {
            id: 'p-1',
            num: '1',
            type: 'Уточнение границ участка',
            settlement: 'г. Котовск',
            date: '12.02.2025',
            status: 'На рассмотрении',
            coords: [52.5922, 41.5031],
            person: { fio: 'Морозов Дмитрий Александрович', phone: '+7 (915) 345-67-89', email: 'morozov.da@mail.ru', address: 'г. Котовск, ул. Победы, д. 22' }
          },
          {
            id: 'p-2',
            num: '2',
            type: 'Исправление реестровой ошибки',
            settlement: 'пгт. Первомайский',
            date: '11.02.2025',
            status: 'На рассмотрении',
            coords: [53.4386, 40.2892],
            person: { fio: 'Волкова Ольга Сергеевна', phone: '+7 (47548) 2-15-36', email: 'volkova.os@gmail.com', address: 'Тамбовская обл., Первомайский р-н, пгт. Первомайский, ул. Мира, д. 7' }
          }
        ]
      },
      plan: {
        period: 'Февраль 2025',
        requestsDone: 42, requestsTotal: 50,
        fieldDone: 7, fieldTotal: 10,
        cadDone: 3, cadTotal: 5,
        notes: {
          requests: 'До плана осталось 8 заявок. Срок — до 28.02.2025.',
          field: 'Запланировано 3 выезда: Котовск, Первомайский, Моршанск.',
          cad: 'В работе 2 объекта: межевание (Тулиновка), учёт изменений (Новая Ляда).',
          total: 'Оценка: план выполняется в срок. Рекомендуется завершить кадастровые работы до 20.02.'
        }
      }
    },
    {
      id: 'u2',
      shortName: 'Петрова А. С.',
      fio: 'Петрова Анна Сергеевна',
      role: 'Специалист по работе с заявками',
      dept: 'Центр обработки заявлений',
      empId: 'ТК-0912',
      phone: '+7 (4752) 23-45-67',
      ext: '141',
      email: 'petrova.as@tambov-kadastr.ru',
      hireDate: '01.06.2021',
      auth: { username: 'petrova', password: 'petrova123' },
      telecom: {
        tariff: 'Корпоративный «Офис+»',
        monthlyFee: '420 ₽/мес',
        nextChargeDate: '01.03.2025',
        minutesPerMonth: 600,
        gbPerMonth: 30,
        minutesRemaining: 455,
        gbRemaining: 12.6,
        simConnectDate: '12.02.2024',
        simNumber: '+7 (4752) 234-56-78'
      },
      requests: {
        accepted: [
          {
            id: 'a-1',
            num: '1',
            type: 'Постановка на кадастровый учёт',
            settlement: 'г. Мичуринск',
            date: '14.02.2025',
            status: 'Выполнена',
            completedDate: '26.02.2025',
            result: 'Документы проверены, заявление подготовлено к регистрации. Ошибок не выявлено.',
            workReport: 'Проверена комплектность и корректность документов, сверены реквизиты и адресные данные. Подготовлено заявление и сформирован пакет для передачи в дальнейшую обработку.',
            employeeComment: 'Комплект документов полный. Рекомендуется сохранить копии и номер обращения для последующих уточнений.',
            coords: [52.8978, 40.4907],
            person: { fio: 'Романова Ирина Павловна', phone: '+7 (920) 111-22-33', email: 'romanova.ip@mail.ru', address: 'г. Мичуринск, ул. Интернациональная, д. 10' }
          },
          {
            id: 'a-2',
            num: '2',
            type: 'Проверка комплекта документов',
            settlement: 'г. Тамбов',
            date: '13.02.2025',
            status: 'Выполнена',
            completedDate: '27.02.2025',
            result: 'Первичная проверка комплекта завершена, замечания по адресу устранены.',
            workReport: 'Выполнен предварительный разбор комплекта: проверены заявление, паспортные данные и сопроводительные документы. Зафиксированы реквизиты для дальнейшей обработки.',
            employeeComment: 'Выявлено расхождение в написании улицы — уточнено по телефону с заявителем, внесены правки в карточку.',
            coords: [52.7317, 41.4433],
            person: { fio: 'Захарова Марина Викторовна', phone: '+7 (910) 222-11-00', email: 'zaharova.mv@mail.ru', address: 'г. Тамбов, ул. Набережная, д. 7' }
          },
          {
            id: 'a-3',
            num: '3',
            type: 'Сопровождение заявления (кадастровый учёт)',
            settlement: 'п. Строитель',
            date: '12.02.2025',
            status: 'Выполнена',
            completedDate: '28.02.2025',
            result: 'Сопровождение заявления оформлено, согласованы сроки и перечень документов.',
            workReport: 'Заявителю разъяснён порядок подачи, сформирован чек-лист позиций комплекта. Зафиксированы сроки предоставления доверенности и дополнительных копий.',
            employeeComment: 'Оригиналы доверенности и выписки получены курьерской доставкой в согласованную дату.',
            coords: [52.5333, 41.4333],
            person: { fio: 'Козлова Мария Ивановна', phone: '+7 (910) 123-45-67', email: 'kozlova.mi@gmail.com', address: 'Тамбовская обл., Тамбовский р-н, п. Строитель, ул. Центральная, д. 8' }
          },
          {
            id: 'a-4',
            num: '4',
            type: 'Внесение изменений в сведения ЕГРН',
            settlement: 'г. Моршанск',
            date: '11.02.2025',
            status: 'Выполнена',
            completedDate: '01.03.2025',
            result: 'Изменения по объекту согласованы и переданы в учёт.',
            workReport: 'Проверен комплект документов, уточнены сведения по адресу и характеристикам объекта, подготовлены материалы для внесения изменений в ЕГРН.',
            employeeComment: 'Заявителю направлен список итоговых документов и сроки обновления статуса.',
            coords: [53.4436, 41.8106],
            person: { fio: 'Киреев Павел Сергеевич', phone: '+7 (920) 123-98-76', email: 'kireev.ps@mail.ru', address: 'г. Моршанск, ул. Комсомольская, д. 14' }
          },
          {
            id: 'a-5',
            num: '5',
            type: 'Проверка и регистрация пакета документов',
            settlement: 'с. Тулиновка',
            date: '10.02.2025',
            status: 'Выполнена',
            completedDate: '02.03.2025',
            result: 'Пакет принят без замечаний, регистрация завершена.',
            workReport: 'Выполнена проверка по чек-листу, сверка данных заявителя и объекта, устранены формальные несоответствия перед регистрацией.',
            employeeComment: 'Рекомендовано сохранять сканы в едином формате PDF для ускорения следующих обращений.',
            coords: [52.8167, 41.6167],
            person: { fio: 'Мельникова Дарья Ильинична', phone: '+7 (915) 654-32-10', email: 'melnikova.di@gmail.com', address: 'Тамбовская обл., Тамбовский р-н, с. Тулиновка, ул. Заречная, д. 9' }
          }
        ],
        pending: [
          {
            id: 'p-1',
            num: '1',
            type: 'Исправление реестровой ошибки',
            settlement: 'пгт. Первомайский',
            date: '16.02.2025',
            status: 'На рассмотрении',
            coords: [53.4386, 40.2892],
            person: { fio: 'Волкова Ольга Сергеевна', phone: '+7 (47548) 2-15-36', email: 'volkova.os@gmail.com', address: 'Тамбовская обл., Первомайский р-н, пгт. Первомайский, ул. Мира, д. 7' }
          },
          {
            id: 'p-2',
            num: '2',
            type: 'Кадастровые работы (здание)',
            settlement: 'с. Платоновка',
            date: '15.02.2025',
            status: 'На рассмотрении',
            coords: [52.8667, 41.4167],
            person: { fio: 'Федоров Андрей Игоревич', phone: '+7 (920) 456-78-90', email: 'fedorov.ai@yandex.ru', address: 'Тамбовская обл., Тамбовский р-н, с. Платоновка, ул. Новая, д. 11' }
          },
          {
            id: 'p-3',
            num: '3',
            type: 'Уточнение статуса заявления',
            settlement: 'г. Котовск',
            date: '17.02.2025',
            status: 'На рассмотрении',
            coords: [52.5922, 41.5031],
            person: { fio: 'Гусев Илья Михайлович', phone: '+7 (920) 333-22-11', email: 'gusev.im@mail.ru', address: 'г. Котовск, ул. Советская, д. 18' }
          },
          {
            id: 'p-4',
            num: '4',
            type: 'Первичная проверка заявления',
            settlement: 'г. Рассказово',
            date: '18.02.2025',
            status: 'На рассмотрении',
            coords: [52.6533, 41.8744],
            person: { fio: 'Кузнецова Алёна Викторовна', phone: '+7 (910) 888-44-22', email: 'kuznetsova.av@mail.ru', address: 'г. Рассказово, ул. Пролетарская, д. 6' }
          },
          {
            id: 'p-5',
            num: '5',
            type: 'Согласование недостающих документов',
            settlement: 'г. Уварово',
            date: '19.02.2025',
            status: 'На рассмотрении',
            coords: [51.9844, 42.2611],
            person: { fio: 'Лебедев Константин Олегович', phone: '+7 (920) 777-66-55', email: 'lebedev.ko@yandex.ru', address: 'г. Уварово, ул. Южная, д. 11' }
          }
        ]
      },
      plan: {
        period: 'Февраль 2025',
        requestsDone: 47, requestsTotal: 55,
        fieldDone: 5, fieldTotal: 8,
        cadDone: 4, cadTotal: 6,
        notes: {
          requests: 'До плана осталось 8 заявок. Приоритет — заявки с истекающим сроком.',
          field: 'Запланировано 3 выезда: Моршанск, Строитель, Новая Ляда.',
          cad: 'В работе 2 объекта: уточнение границ и подготовка техплана.',
          total: 'Оценка: темп хороший. Рекомендуется закрыть 2 заявки до 22.02.'
        }
      }
    },
    {
      id: 'u3',
      shortName: 'Сидоров А. В.',
      fio: 'Сидоров Алексей Викторович',
      role: 'Инженер-кадастровый',
      dept: 'Полевые работы и выезды',
      empId: 'ТК-0783',
      phone: '+7 (4752) 98-76-54',
      ext: '156',
      email: 'sidorov.av@tambov-kadastr.ru',
      hireDate: '12.11.2019',
      auth: { username: 'sidorov', password: 'sidorov123' },
      telecom: {
        tariff: 'Корпоративный «Полевой»',
        monthlyFee: '500 ₽/мес',
        nextChargeDate: '25.02.2025',
        minutesPerMonth: 800,
        gbPerMonth: 40,
        minutesRemaining: 640,
        gbRemaining: 28.9,
        simConnectDate: '05.05.2022',
        simNumber: '+7 (4752) 987-65-43'
      },
      requests: {
        accepted: [
          {
            id: 'a-1',
            num: '1',
            type: 'Выезд на объект (замеры участка)',
            settlement: 'г. Котовск',
            date: '18.02.2025',
            status: 'Выполнена',
            completedDate: '27.02.2025',
            result: 'Выполнены замеры на местности, подготовлены материалы для камеральной обработки.',
            workReport: 'Согласован выезд, выполнены полевые замеры, сделана фотофиксация, отмечены ориентиры. Материалы подготовлены для камеральной обработки и формирования итогового пакета.',
            employeeComment: 'Доступ на объект предоставлен без задержек. На участке обнаружены ориентиры, требующие уточнения на следующем визите (при необходимости).',
            coords: [52.5922, 41.5031],
            person: { fio: 'Громов Николай Андреевич', phone: '+7 (915) 222-33-44', email: 'gromov.na@mail.ru', address: 'г. Котовск, ул. Кирова, д. 5' }
          },
          {
            id: 'a-2',
            num: '2',
            type: 'Межевание (уточнение границ)',
            settlement: 'пгт. Новая Ляда',
            date: '19.02.2025',
            status: 'Выполнена',
            completedDate: '28.02.2025',
            result: 'Полевой этап по уточнению границ выполнен, материалы переданы в камеральную обработку.',
            workReport: 'Согласован выезд, выполнены измерения по линии границ, зафиксированы пограничные знаки и характерные точки. Сняты фото привязки к местности.',
            employeeComment: 'Один из соседей отсутствовал — оставлено уведомление о необходимости согласования. При необходимости — повторный визит.',
            coords: [52.6017, 41.6314],
            person: { fio: 'Никитина Елена Петровна', phone: '+7 (4752) 48-90-12', email: 'nikitina.ep@inbox.ru', address: 'Тамбовская обл., Тамбовский р-н, пгт. Новая Ляда, пер. Молодёжный, д. 15' }
          },
          {
            id: 'a-3',
            num: '3',
            type: 'Осмотр объекта (подготовка техплана)',
            settlement: 'г. Тамбов',
            date: '17.02.2025',
            status: 'Выполнена',
            completedDate: '01.03.2025',
            result: 'Осмотр выполнен; по недоступным зонам запланировано дополнение замеров.',
            workReport: 'Проведён внешний осмотр здания, сняты габариты фасада и отметки входной группы. Зафиксированы видимые деформации для отражения в техплане.',
            employeeComment: 'Доступ на чердак не предоставлен — замеры чердачного перекрытия согласованы на отдельный выезд при согласии собственника.',
            coords: [52.7317, 41.4433],
            person: { fio: 'Смирнов Кирилл Олегович', phone: '+7 (910) 444-55-66', email: 'smirnov.ko@mail.ru', address: 'г. Тамбов, ул. Гагарина, д. 20' }
          },
          {
            id: 'a-4',
            num: '4',
            type: 'Выездное обследование участка',
            settlement: 'г. Рассказово',
            date: '16.02.2025',
            status: 'Выполнена',
            completedDate: '02.03.2025',
            result: 'Обследование завершено, материалы переданы для камеральной обработки.',
            workReport: 'На объекте выполнены контрольные замеры, фотофиксация и проверка ориентиров. Подготовлены полевые материалы с координатной привязкой.',
            employeeComment: 'Подъезд к участку ограничен в дождливую погоду, рекомендовано планировать повторный выезд в сухой день при необходимости.',
            coords: [52.6533, 41.8744],
            person: { fio: 'Кузнецова Алёна Викторовна', phone: '+7 (910) 888-44-22', email: 'kuznetsova.av@mail.ru', address: 'г. Рассказово, ул. Пролетарская, д. 6' }
          },
          {
            id: 'a-5',
            num: '5',
            type: 'Замеры для подготовки межевого плана',
            settlement: 'г. Уварово',
            date: '15.02.2025',
            status: 'Выполнена',
            completedDate: '03.03.2025',
            result: 'Полевой этап завершён, данные переданы на оформление межевого плана.',
            workReport: 'Выполнена съёмка характерных точек, проверены границы с соседними участками, оформлены полевые журналы и переданы в отдел обработки.',
            employeeComment: 'Соседние землепользователи присутствовали при замерах, спорных точек не выявлено.',
            coords: [51.9844, 42.2611],
            person: { fio: 'Лебедев Константин Олегович', phone: '+7 (920) 777-66-55', email: 'lebedev.ko@yandex.ru', address: 'г. Уварово, ул. Южная, д. 11' }
          }
        ],
        pending: [
          {
            id: 'p-1',
            num: '1',
            type: 'Подготовка материалов выезда',
            settlement: 'г. Моршанск',
            date: '20.02.2025',
            status: 'На рассмотрении',
            coords: [53.4436, 41.8106],
            person: { fio: 'Зайцев Артём Олегович', phone: '+7 (920) 333-44-55', email: 'zaitsev.ao@mail.ru', address: 'г. Моршанск, ул. Ленина, д. 2' }
          },
          {
            id: 'p-2',
            num: '2',
            type: 'Согласование графика выездов',
            settlement: 'г. Мичуринск',
            date: '21.02.2025',
            status: 'На рассмотрении',
            coords: [52.8978, 40.4907],
            person: { fio: 'Романова Ирина Павловна', phone: '+7 (920) 111-22-33', email: 'romanova.ip@mail.ru', address: 'г. Мичуринск, ул. Интернациональная, д. 10' }
          },
          {
            id: 'p-3',
            num: '3',
            type: 'Подготовка схемы расположения',
            settlement: 'п. Строитель',
            date: '22.02.2025',
            status: 'На рассмотрении',
            coords: [52.5333, 41.4333],
            person: { fio: 'Козлова Мария Ивановна', phone: '+7 (910) 123-45-67', email: 'kozlova.mi@gmail.com', address: 'Тамбовская обл., Тамбовский р-н, п. Строитель, ул. Центральная, д. 8' }
          },
          {
            id: 'p-4',
            num: '4',
            type: 'Согласование повторного выезда',
            settlement: 'г. Кирсанов',
            date: '23.02.2025',
            status: 'На рассмотрении',
            coords: [52.6519, 42.7288],
            person: { fio: 'Орлов Максим Николаевич', phone: '+7 (920) 101-20-30', email: 'orlov.mn@mail.ru', address: 'г. Кирсанов, ул. Рабочая, д. 4' }
          },
          {
            id: 'p-5',
            num: '5',
            type: 'Проверка границ перед актом согласования',
            settlement: 'г. Жердевка',
            date: '24.02.2025',
            status: 'На рассмотрении',
            coords: [51.8422, 41.4611],
            person: { fio: 'Соловьёва Ирина Дмитриевна', phone: '+7 (915) 333-00-99', email: 'soloveva.id@mail.ru', address: 'г. Жердевка, ул. Полевая, д. 12' }
          }
        ]
      },
      plan: {
        period: 'Февраль 2025',
        requestsDone: 36, requestsTotal: 45,
        fieldDone: 9, fieldTotal: 12,
        cadDone: 2, cadTotal: 4,
        notes: {
          requests: 'До плана осталось 9 задач. Основной фокус — выезды и замеры.',
          field: 'Запланировано 3 выезда: Моршанск, Первомайский, Мичуринск.',
          cad: 'В работе 2 объекта: межевание и подготовка акта обследования.',
          total: 'Оценка: выполнение стабильное. Рекомендуется завершить 1 кадастровую работу до 25.02.'
        }
      }
    },
    {
      id: 'u_admin',
      shortName: 'Администратор',
      fio: 'Системный администратор',
      role: 'Системный администратор',
      dept: 'ИТ-служба',
      empId: 'ТК-0001',
      phone: '+7 (4752) 00-00-01',
      ext: '101',
      email: 'admin@tambov-kadastr.ru',
      hireDate: '01.01.2024',
      isAdmin: true,
      auth: { username: 'admin', password: 'admin123' },
      telecom: {
        tariff: 'Корпоративный «Админ»',
        monthlyFee: '0 ₽/мес',
        nextChargeDate: '—',
        minutesPerMonth: 0,
        gbPerMonth: 0,
        minutesRemaining: 0,
        gbRemaining: 0,
        simConnectDate: '—',
        simNumber: '—'
      },
      requests: { accepted: [], pending: [] },
      plan: {
        period: 'Февраль 2025',
        requestsDone: 0, requestsTotal: 0,
        fieldDone: 0, fieldTotal: 0,
        cadDone: 0, cadTotal: 0,
        notes: { requests: '—', field: '—', cad: '—', total: '—' }
      }
    }
  ];

  var USERS_DB = null;

  function deepClone(obj) {
    try { return JSON.parse(JSON.stringify(obj)); } catch (e) {}
    return obj;
  }

  function loadUsersDb() {
    try {
      var raw = localStorage.getItem(USERS_DB_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return deepClone(USERS_SEED);
  }

  function getUsers() {
    if (!USERS_DB) USERS_DB = loadUsersDb();
    return USERS_DB;
  }

  function saveUsers() {
    try { localStorage.setItem(USERS_DB_KEY, JSON.stringify(getUsers())); } catch (e) {}
  }

  function isAdminUser(user) {
    return !!(user && (user.isAdmin || (user.role && String(user.role).toLowerCase().indexOf('администратор') !== -1)));
  }

  function getRequestOverrides() {
    try {
      var raw = localStorage.getItem(REQUEST_OVERRIDES_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {}
    return {};
  }

  function setRequestOverride(key, patch) {
    if (!key) return;
    var all = getRequestOverrides();
    all[key] = Object.assign({}, all[key] || {}, patch || {});
    try { localStorage.setItem(REQUEST_OVERRIDES_KEY, JSON.stringify(all)); } catch (e) {}
  }

  function getUserById(id) {
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) return users[i];
    }
    return null;
  }

  function getCurrentUser() {
    var id = null;
    try { id = localStorage.getItem(AUTH_USER_KEY); } catch (e) {}
    if (!id) return null;
    return getUserById(id);
  }

  function setCurrentUserId(id) {
    try { localStorage.setItem(AUTH_USER_KEY, id); } catch (e) {}
  }

  function clearAuth() {
    try { localStorage.removeItem(AUTH_USER_KEY); } catch (e) {}
  }

  function getNextFromUrl() {
    try {
      var qs = new URLSearchParams(window.location.search || '');
      return qs.get('next');
    } catch (e) {}
    return null;
  }

  function redirectToLogin() {
    var current = (window.location && window.location.pathname) ? window.location.pathname.split('/').pop() : '';
    var next = encodeURIComponent(current || 'cabinet.html');
    window.location.href = 'login.html?next=' + next;
  }

  function getToastHost() {
    var host = document.getElementById('toast-host');
    if (host) return host;
    host = document.createElement('div');
    host.id = 'toast-host';
    host.className = 'toast-host';
    host.setAttribute('aria-live', 'polite');
    host.setAttribute('aria-relevant', 'additions');
    document.body.appendChild(host);
    return host;
  }

  function showToast(text, opts) {
    var options = opts || {};
    var kind = options.kind || 'success';
    var duration = typeof options.duration === 'number' ? options.duration : 5000;

    var host = getToastHost();
    var el = document.createElement('div');
    el.className = 'toast toast--' + kind;
    el.setAttribute('role', 'status');
    el.textContent = text || '';
    host.appendChild(el);

    requestAnimationFrame(function () {
      el.classList.add('toast--show');
    });

    window.setTimeout(function () {
      el.classList.remove('toast--show');
      window.setTimeout(function () {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }, 220);
    }, duration);
  }

  function queueToast(toast) {
    try { sessionStorage.setItem(PENDING_TOAST_KEY, JSON.stringify(toast || {})); } catch (e) {}
  }

  function consumeQueuedToast() {
    var raw = null;
    try { raw = sessionStorage.getItem(PENDING_TOAST_KEY); } catch (e) {}
    if (!raw) return;
    try { sessionStorage.removeItem(PENDING_TOAST_KEY); } catch (err) {}
    try {
      var t = JSON.parse(raw);
      if (t && t.text) {
        showToast(t.text, { kind: t.kind || 'success', duration: typeof t.duration === 'number' ? t.duration : 5000 });
      }
    } catch (e2) {}
  }

  function requireAuthIfNeeded() {
    var needs = document.querySelector('[data-require-auth="true"]');
    if (!needs) return;
    if (!getCurrentUser()) redirectToLogin();
  }

  function setHeaderUserName(user) {
    var els = document.querySelectorAll('#header-user-name, .header__name');
    if (!els || els.length === 0) return;
    var name = user ? user.shortName : 'Гость';
    els.forEach(function (el) { el.textContent = name; });
  }

  function initNavActive() {
    var navLinks = document.querySelectorAll('.nav a.nav__tab[href]');
    if (!navLinks || navLinks.length === 0) return;

    var path = (window.location && window.location.pathname) ? window.location.pathname : '';
    var current = path.split('/').pop() || 'index.html';

    navLinks.forEach(function (a) {
      a.classList.remove(ACTIVE_CLASS);
      a.removeAttribute('aria-current');
    });

    var activeLink = null;
    navLinks.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var page = href.split('#')[0].split('?')[0].split('/').pop();
      if (page === current) activeLink = a;
    });

    if (!activeLink) {
      navLinks.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        var page = href.split('#')[0].split('?')[0].split('/').pop();
        if (page === 'index.html') activeLink = a;
      });
    }

    if (activeLink) {
      activeLink.classList.add(ACTIVE_CLASS);
      activeLink.setAttribute('aria-current', 'page');
    }
  }

  function initGotoLinks() {
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-goto]') : null;
      if (!btn) return;
      var href = btn.getAttribute('data-goto');
      if (!href) return;
      window.location.href = href;
    });
  }

  var mapInitialized = false;
  var mapInstance = null;

  function initMapOnce() {
    var mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    if (!mapInitialized) {
      mapInitialized = true;
      var center = [52.7317, 41.4433];
      mapInstance = L.map('map', {
        center: center,
        zoom: 8,
        zoomControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstance);

      var cities = [
        { coords: [52.7317, 41.4433], name: 'Тамбов (адм. центр)' },
        { coords: [52.5922, 41.5031], name: 'Котовск' },
        { coords: [52.8978, 40.4907], name: 'Мичуринск' },
        { coords: [53.4436, 41.8106], name: 'Моршанск' },
        { coords: [53.4386, 40.2892], name: 'Первомайский' },
        { coords: [52.5333, 41.4333], name: 'Строитель' }
      ];
      cities.forEach(function (city, i) {
        L.marker(city.coords).addTo(mapInstance).bindPopup(city.name);
      });
    }

    if (mapInstance) {
      setTimeout(function () {
        mapInstance.invalidateSize();
      }, 100);
    }
  }

  function initMapPage() {
    if (document.getElementById('map')) {
      initMapOnce();
    }
  }

  /* ----- Карточка заявки (полная информация + карта + заявитель) ----- */
  var requestDetailMapInstance = null;

  function closeRequestModal() {
    var modal = document.getElementById('modal-request');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (requestDetailMapInstance && typeof requestDetailMapInstance.remove === 'function') {
      requestDetailMapInstance.remove();
      requestDetailMapInstance = null;
    }
  }

  function openRequestModal(requestId) {
    var data = REQUEST_DATA[requestId];
    if (!data) return;

    var modal = document.getElementById('modal-request');
    var infoList = document.getElementById('request-detail-info');
    var personList = document.getElementById('request-detail-person');
    var numEl = document.getElementById('request-detail-num');
    var mapEl = document.getElementById('request-detail-map');
    var adminBlock = document.getElementById('request-admin');
    var adminStatus = document.getElementById('request-admin-status');
    var adminCompleted = document.getElementById('request-admin-completed');
    var adminSave = document.getElementById('request-admin-save');

    if (!modal || !infoList || !personList || !numEl || !mapEl) return;

    currentRequestId = requestId;
    numEl.textContent = data.num + ' (' + data.settlement + ')';

    var extra = '';
    if (data.status === 'Выполнена') {
      if (data.completedDate) extra += '<dt>Дата выполнения</dt><dd>' + escapeHtml(data.completedDate) + '</dd>';
      if (data.result) extra += '<dt>Результат</dt><dd>' + escapeHtml(data.result) + '</dd>';
    }
    infoList.innerHTML =
      '<dt>Тип работ</dt><dd>' + escapeHtml(data.type) + '</dd>' +
      '<dt>Населённый пункт / ПГТ</dt><dd>' + escapeHtml(data.settlement) + '</dd>' +
      '<dt>Дата</dt><dd>' + escapeHtml(data.date) + '</dd>' +
      '<dt>Статус</dt><dd>' + escapeHtml(data.status) + '</dd>' +
      extra;

    personList.innerHTML =
      '<dt>ФИО</dt><dd>' + escapeHtml(data.person.fio) + '</dd>' +
      '<dt>Телефон</dt><dd>' + escapeHtml(data.person.phone) + '</dd>' +
      '<dt>Email</dt><dd>' + escapeHtml(data.person.email) + '</dd>' +
      '<dt>Адрес</dt><dd>' + escapeHtml(data.person.address) + '</dd>';

    (function () {
      var user = getCurrentUser();
      var adminMode = isAdminUser(user);
      if (adminBlock) adminBlock.hidden = !adminMode;
      if (!adminMode) return;
      if (adminStatus) adminStatus.value = data.status || 'На рассмотрении';
      if (adminCompleted) adminCompleted.value = data.completedDate || '';
      if (adminSave && !adminSave.__bound) {
        adminSave.__bound = true;
        adminSave.addEventListener('click', function () {
          if (!currentRequestId) return;
          var newStatus = adminStatus ? adminStatus.value : null;
          var completed = adminCompleted ? (adminCompleted.value || '').trim() : '';
          var patch = {};
          if (newStatus) patch.status = newStatus;
          if (newStatus === 'Выполнена') {
            patch.completedDate = completed || (function () {
              var d = new Date();
              var dd = ('0' + d.getDate()).slice(-2);
              var mm = ('0' + (d.getMonth() + 1)).slice(-2);
              var yyyy = d.getFullYear();
              return dd + '.' + mm + '.' + yyyy;
            })();
          } else {
            patch.completedDate = '';
          }
          setRequestOverride(currentRequestId, patch);
          showToast('Статус заявки обновлён', { kind: 'success', duration: 5000 });
          closeRequestModal();
          // Re-render page with updated overrides
          var cu = getCurrentUser();
          if (cu) initRequestsPage(cu);
        });
      }
    })();

    if (requestDetailMapInstance) {
      requestDetailMapInstance.remove();
      requestDetailMapInstance = null;
    }
    mapEl.innerHTML = '';

    if (typeof L !== 'undefined' && data.coords && data.coords.length === 2) {
      setTimeout(function () {
        requestDetailMapInstance = L.map('request-detail-map', {
          center: data.coords,
          zoom: 14,
          zoomControl: false
        });
        L.control.zoom({ position: 'topright' }).addTo(requestDetailMapInstance);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(requestDetailMapInstance);
        L.marker(data.coords).addTo(requestDetailMapInstance).bindPopup(data.settlement).openPopup();
      }, 50);
    }

    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function initRequestModal() {
    var modal = document.getElementById('modal-request');
    var btnClose = document.getElementById('modal-request-close');
    var backdrop = document.getElementById('modal-request-backdrop');
    if (initRequestModal.__inited) return;
    initRequestModal.__inited = true;

    if (btnClose) btnClose.addEventListener('click', closeRequestModal);
    if (backdrop) backdrop.addEventListener('click', closeRequestModal);

    document.addEventListener('click', function (e) {
      var row = e.target && e.target.closest ? e.target.closest('.requests-table__row-clickable') : null;
      if (!row) return;
      if (e.target && e.target.closest && e.target.closest('[data-request-pdf]')) return;
      var id = row.getAttribute('data-request-id');
      if (id) openRequestModal(id);
    });

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-request-pdf]') : null;
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var id = btn.getAttribute('data-request-pdf');
      if (!id) return;
      var data = REQUEST_DATA[id];
      if (!data || data.status !== 'Выполнена') return;
      downloadRequestPdf(data);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') closeRequestModal();
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var row = e.target && e.target.closest ? e.target.closest('.requests-table__row-clickable') : null;
      if (!row) return;
      e.preventDefault();
      var id = row.getAttribute('data-request-id');
      if (id) openRequestModal(id);
    });
  }

  function downloadRequestPdf(data) {
    if (!data) return;
    if (!window.jspdf || !window.jspdf.jsPDF) {
      if (typeof alert !== 'undefined') alert('PDF-библиотека не загрузилась. Проверьте интернет-соединение.');
      return;
    }

    // Prefer screenshot-based PDF from a dedicated report DOM (includes work report + employee comments).
    if (typeof window.html2canvas === 'function') {
      var reportEl = document.getElementById('pdf-report');
      if (reportEl) {
        var user = getCurrentUser();
        var generatedAt = (function () {
          var d = new Date();
          var dd = ('0' + d.getDate()).slice(-2);
          var mm = ('0' + (d.getMonth() + 1)).slice(-2);
          var yyyy = d.getFullYear();
          var hh = ('0' + d.getHours()).slice(-2);
          var mi = ('0' + d.getMinutes()).slice(-2);
          return dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + mi;
        })();

        var coordsLine = (data.coords && data.coords.length === 2)
          ? ('<dt>Координаты объекта</dt><dd>' + escapeHtml(String(data.coords[0]) + ', ' + String(data.coords[1])) + '</dd>')
          : '';

        reportEl.innerHTML =
          '<h1 class="pdf-report__title">Отчёт по выполненной заявке</h1>' +
          '<p class="pdf-report__meta">' +
            '<strong>Сформировано:</strong> ' + escapeHtml(generatedAt) + '<br>' +
            (user ? ('<strong>Сотрудник:</strong> ' + escapeHtml(user.fio) + ' — ' + escapeHtml(user.role) + '<br>') : '') +
            (user ? ('<strong>Подразделение:</strong> ' + escapeHtml(user.dept)) : '') +
          '</p>' +
          '<div class="pdf-report__section">' +
            '<h2 class="pdf-report__section-title">Информация о заявке</h2>' +
            '<dl class="pdf-report__dl">' +
              '<dt>Номер заявки</dt><dd>' + escapeHtml(data.num || '—') + '</dd>' +
              '<dt>Населённый пункт</dt><dd>' + escapeHtml(data.settlement || '—') + '</dd>' +
              '<dt>Тип работ</dt><dd>' + escapeHtml(data.type || '—') + '</dd>' +
              '<dt>Статус</dt><dd>' + escapeHtml(data.status || '—') + '</dd>' +
              '<dt>Дата подачи</dt><dd>' + escapeHtml(data.date || '—') + '</dd>' +
              (data.completedDate ? ('<dt>Дата выполнения</dt><dd>' + escapeHtml(data.completedDate) + '</dd>') : '') +
              (data.result ? ('<dt>Результат</dt><dd class="pdf-report__multiline">' + escapeHtml(data.result) + '</dd>') : '') +
              coordsLine +
            '</dl>' +
          '</div>' +
          '<div class="pdf-report__section">' +
            '<h2 class="pdf-report__section-title">Заявитель</h2>' +
            '<dl class="pdf-report__dl">' +
              '<dt>ФИО</dt><dd>' + escapeHtml(data.person && data.person.fio ? data.person.fio : '') + '</dd>' +
              '<dt>Телефон</dt><dd>' + escapeHtml(data.person && data.person.phone ? data.person.phone : '') + '</dd>' +
              '<dt>Email</dt><dd>' + escapeHtml(data.person && data.person.email ? data.person.email : '') + '</dd>' +
              '<dt>Адрес</dt><dd>' + escapeHtml(data.person && data.person.address ? data.person.address : '') + '</dd>' +
            '</dl>' +
          '</div>' +
          '<div class="pdf-report__section">' +
            '<h2 class="pdf-report__section-title">Отчёт о проделанной работе</h2>' +
            '<dl class="pdf-report__dl">' +
              '<dt>Описание</dt><dd class="pdf-report__multiline">' + escapeHtml(data.workReport || '—') + '</dd>' +
            '</dl>' +
          '</div>' +
          '<div class="pdf-report__section">' +
            '<h2 class="pdf-report__section-title">Комментарий сотрудника</h2>' +
            '<dl class="pdf-report__dl">' +
              '<dt>Комментарий сотрудника</dt><dd class="pdf-report__multiline">' + escapeHtml(data.employeeComment || '—') + '</dd>' +
            '</dl>' +
          '</div>';

        function runHtml2Canvas() {
          return window.html2canvas(reportEl, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            scrollX: 0,
            scrollY: 0,
            windowWidth: reportEl.scrollWidth,
            windowHeight: reportEl.scrollHeight
          });
        }

        function buildPdfFromCanvas(canvas) {
          if (!canvas || canvas.width < 2 || canvas.height < 2) {
            generateTextPdfFallback(data);
            return;
          }
          var doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4' });
          var pageW = doc.internal.pageSize.getWidth();
          var pageH = doc.internal.pageSize.getHeight();

          var margin = 24;
          var usableW = pageW - margin * 2;
          var usableH = pageH - margin * 2;
          var imgW = usableW;
          var imgH = canvas.height * (imgW / canvas.width);

          var imgData = canvas.toDataURL('image/png');
          var y = margin;
          var remaining = imgH;

          while (remaining > 0) {
            doc.addImage(imgData, 'PNG', margin, y, imgW, imgH);
            remaining -= usableH;
            if (remaining > 0) {
              doc.addPage();
              y -= usableH;
            }
          }

          var filename = 'otchet_zayavka_' + (data.num || 'na') + '.pdf';
          doc.save(filename);
        }

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            runHtml2Canvas()
              .then(function (canvas) {
                buildPdfFromCanvas(canvas);
              })
              .catch(function () {
                generateTextPdfFallback(data);
              });
          });
        });
        return;
      }
    }

    generateTextPdfFallback(data);
  }

  function generateTextPdfFallback(data) {
    var doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4' });

    var x = 40;
    var y = 52;
    var lh = 16;

    doc.setFontSize(14);
    doc.text('Отчёт по выполненной заявке', x, y);
    y += 22;

    doc.setFontSize(11);
    var user = getCurrentUser();
    var generatedAt = (function () {
      var d = new Date();
      var dd = ('0' + d.getDate()).slice(-2);
      var mm = ('0' + (d.getMonth() + 1)).slice(-2);
      var yyyy = d.getFullYear();
      var hh = ('0' + d.getHours()).slice(-2);
      var mi = ('0' + d.getMinutes()).slice(-2);
      return dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + mi;
    })();

    var lines = [
      'Сформировано: ' + generatedAt,
      user ? ('Сотрудник: ' + user.fio + ' — ' + user.role) : null,
      user ? ('Подразделение: ' + user.dept) : null,
      '',
      'Информация о заявке',
      'Номер заявки: ' + (data.num || '—'),
      'Населённый пункт: ' + (data.settlement || '—'),
      'Тип работ: ' + (data.type || '—'),
      'Статус: ' + (data.status || '—'),
      'Дата подачи: ' + (data.date || '—'),
      data.completedDate ? ('Дата выполнения: ' + data.completedDate) : null,
      data.result ? ('Результат: ' + data.result) : null,
      (data.coords && data.coords.length === 2) ? ('Координаты объекта: ' + data.coords[0] + ', ' + data.coords[1]) : null,
      '',
      'Заявитель',
      'ФИО: ' + (data.person && data.person.fio ? data.person.fio : ''),
      'Телефон: ' + (data.person && data.person.phone ? data.person.phone : ''),
      'Email: ' + (data.person && data.person.email ? data.person.email : ''),
      'Адрес: ' + (data.person && data.person.address ? data.person.address : ''),
      '',
      'Отчёт о проделанной работе',
      (data.workReport || '—'),
      '',
      'Комментарий сотрудника',
      (data.employeeComment || '—')
    ].filter(function (v) { return v != null; });

    function addWrapped(text) {
      var wrapped = doc.splitTextToSize(String(text), 515);
      wrapped.forEach(function (line) {
        if (y > 800) {
          doc.addPage();
          y = 52;
        }
        doc.text(line, x, y);
        y += lh;
      });
    }

    lines.forEach(addWrapped);

    var filename = 'otchet_zayavka_' + (data.num || 'na') + '.pdf';
    doc.save(filename);
  }

  function initLogout() {
    var logoutBtn = document.querySelector('.header__logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        clearAuth();
        window.location.href = 'login.html';
      });
    }
  }

  function initLoginPage() {
    var form = document.getElementById('login-form');
    var select = document.getElementById('login-user');
    var usernameInput = document.getElementById('login-username');
    var passwordInput = document.getElementById('login-password');
    var errorEl = document.getElementById('login-error');
    if (!form || !select || !usernameInput || !passwordInput) return;

    function setError(msg) {
      if (errorEl) errorEl.textContent = msg || '';
    }

    select.innerHTML = getUsers().map(function (u) {
      return '<option value="' + u.id + '">' + escapeHtml(u.fio) + '</option>';
    }).join('');

    var lastId = null;
    try { lastId = localStorage.getItem(AUTH_LAST_USER_KEY); } catch (e) {}
    if (lastId && getUserById(lastId)) {
      select.value = lastId;
    }

    function fillFromSelected() {
      var u = getUserById(select.value);
      if (!u) return;
      usernameInput.value = u.auth.username;
      passwordInput.value = u.auth.password;
      setError('');
    }

    select.addEventListener('change', fillFromSelected);
    fillFromSelected();

    var current = getCurrentUser();
    if (current) {
      window.location.href = getNextFromUrl() || 'cabinet.html';
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setError('');

      var userId = select.value;
      var u = getUserById(userId);
      if (!u) {
        setError('Выберите сотрудника');
        return;
      }

      var username = (usernameInput.value || '').trim();
      var password = (passwordInput.value || '').trim();
      if (username === '' || password === '') {
        setError('Введите логин и пароль');
        return;
      }

      if (username !== u.auth.username || password !== u.auth.password) {
        setError('Неверный логин или пароль');
        return;
      }

      setCurrentUserId(u.id);
      try { localStorage.setItem(AUTH_LAST_USER_KEY, u.id); } catch (err) {}
      queueToast({ text: 'Успешная авторизация', kind: 'success', duration: 5000 });
      window.location.href = getNextFromUrl() || 'cabinet.html';
    });
  }

  function initCabinetPage(user) {
    var fio = document.getElementById('emp-fio');
    if (!fio) return;
    document.getElementById('emp-fio').textContent = user.fio;
    document.getElementById('emp-role').textContent = user.role;
    document.getElementById('emp-dept').textContent = user.dept;
    document.getElementById('emp-id').textContent = user.empId;
    document.getElementById('emp-phone').textContent = user.phone;
    document.getElementById('emp-ext').textContent = user.ext;
    document.getElementById('emp-email').textContent = user.email;
    document.getElementById('emp-hire-date').textContent = user.hireDate;

    var t = user.telecom;
    if (!t) return;

    var minutesRemainingEl = document.getElementById('telecom-minutes-remaining');
    var minutesFillEl = document.getElementById('telecom-minutes-fill');
    var minutesBarEl = document.getElementById('telecom-minutes-progress');
    var gbRemainingEl = document.getElementById('telecom-gb-remaining');
    var gbFillEl = document.getElementById('telecom-gb-fill');
    var gbBarEl = document.getElementById('telecom-gb-progress');

    function pct(done, total) {
      if (!total) return 0;
      return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
    }

    if (minutesRemainingEl) {
      minutesRemainingEl.textContent = t.minutesRemaining + ' из ' + t.minutesPerMonth + ' мин';
    }
    setProgress(minutesFillEl, minutesBarEl, pct(t.minutesRemaining, t.minutesPerMonth));

    function formatGb(v) {
      if (typeof v !== 'number') return String(v);
      return String(v).replace('.', ',');
    }
    if (gbRemainingEl) {
      gbRemainingEl.textContent = formatGb(t.gbRemaining) + ' ГБ из ' + t.gbPerMonth + ' ГБ';
    }
    setProgress(gbFillEl, gbBarEl, pct(t.gbRemaining, t.gbPerMonth));

    var tariffEl = document.getElementById('telecom-tariff');
    var feeEl = document.getElementById('telecom-fee');
    var nextChargeEl = document.getElementById('telecom-next-charge');
    var minutesMonthEl = document.getElementById('telecom-minutes-month');
    var gbMonthEl = document.getElementById('telecom-gb-month');
    var simDateEl = document.getElementById('telecom-sim-date');
    var simNumberEl = document.getElementById('telecom-sim-number');

    if (tariffEl) tariffEl.textContent = t.tariff;
    if (feeEl) feeEl.textContent = t.monthlyFee;
    if (nextChargeEl) nextChargeEl.textContent = t.nextChargeDate;
    if (minutesMonthEl) minutesMonthEl.textContent = t.minutesPerMonth + ' мин';
    if (gbMonthEl) gbMonthEl.textContent = t.gbPerMonth + ' ГБ';
    if (simDateEl) simDateEl.textContent = t.simConnectDate;
    if (simNumberEl) simNumberEl.textContent = t.simNumber;
  }

  function setProgress(elFill, elBar, percent) {
    if (elFill) elFill.style.setProperty('--progress', percent + '%');
    if (elBar) elBar.setAttribute('aria-valuenow', String(percent));
  }

  function initPlanPage(user) {
    var periodEl = document.getElementById('plan-period');
    if (!periodEl) return;

    periodEl.textContent = user.plan.period;

    function pct(done, total) {
      if (!total) return 0;
      return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
    }

    var reqPct = pct(user.plan.requestsDone, user.plan.requestsTotal);
    document.getElementById('plan-req-value').textContent = user.plan.requestsDone + ' из ' + user.plan.requestsTotal;
    document.getElementById('plan-req-percent').textContent = reqPct + '%';
    document.getElementById('plan-req-note').textContent = user.plan.notes.requests;
    setProgress(document.getElementById('plan-req-fill'), document.getElementById('plan-req-progress'), reqPct);

    var fieldPct = pct(user.plan.fieldDone, user.plan.fieldTotal);
    document.getElementById('plan-field-value').textContent = user.plan.fieldDone + ' из ' + user.plan.fieldTotal;
    document.getElementById('plan-field-percent').textContent = fieldPct + '%';
    document.getElementById('plan-field-note').textContent = user.plan.notes.field;
    setProgress(document.getElementById('plan-field-fill'), document.getElementById('plan-field-progress'), fieldPct);

    var cadPct = pct(user.plan.cadDone, user.plan.cadTotal);
    document.getElementById('plan-cad-value').textContent = user.plan.cadDone + ' из ' + user.plan.cadTotal;
    document.getElementById('plan-cad-percent').textContent = cadPct + '%';
    document.getElementById('plan-cad-note').textContent = user.plan.notes.cad;
    setProgress(document.getElementById('plan-cad-fill'), document.getElementById('plan-cad-progress'), cadPct);

    var totalPct = Math.round((reqPct + fieldPct + cadPct) / 3);
    var totalBar = document.getElementById('plan-total-progress');
    if (totalBar) totalBar.setAttribute('aria-valuenow', String(totalPct));
    var totalFill = document.getElementById('plan-total-fill');
    if (totalFill) totalFill.style.setProperty('--percent', totalPct);
    document.getElementById('plan-total-percent').textContent = totalPct + '%';
    document.getElementById('plan-total-comment').textContent = user.plan.notes.total;
  }

  /* ===== Администрирование: сотрудники ===== */
  function initAdminPage(user) {
    var tbody = document.getElementById('admin-users-body');
    if (!tbody) return;

    if (!isAdminUser(user)) {
      tbody.innerHTML = '<tr><td colspan="6" style="color: var(--text-muted); padding: 0.75rem 1rem;">Доступ запрещён</td></tr>';
      return;
    }

    var modal = document.getElementById('modal-admin-user');
    var closeBtn = document.getElementById('modal-admin-user-close');
    var backdrop = document.getElementById('modal-admin-user-backdrop');
    var form = document.getElementById('admin-user-form');
    var addBtn = document.getElementById('admin-add-user');
    var cancelBtn = document.getElementById('admin-user-cancel');

    var fieldId = document.getElementById('admin-user-id');
    var fieldUsername = document.getElementById('admin-user-username');
    var fieldPassword = document.getElementById('admin-user-password');
    var fieldFio = document.getElementById('admin-user-fio');
    var fieldShort = document.getElementById('admin-user-short');
    var fieldRole = document.getElementById('admin-user-role');
    var fieldDept = document.getElementById('admin-user-dept');
    var fieldPhone = document.getElementById('admin-user-phone');
    var fieldExt = document.getElementById('admin-user-ext');
    var fieldEmail = document.getElementById('admin-user-email');

    function openModal() {
      if (!modal) return;
      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }

    function generateUserId() {
      var d = new Date();
      var seed = String(d.getTime()) + String(Math.floor(Math.random() * 10000));
      return 'u' + seed;
    }

    function normalizeSpace(s) {
      return String(s || '').replace(/\s+/g, ' ').trim();
    }

    function render() {
      var users = getUsers().filter(function (u) { return u && !u.isAdmin; });
      tbody.innerHTML = users.map(function (u) {
        return '' +
          '<tr>' +
            '<td>' + escapeHtml(u.shortName || '—') + '</td>' +
            '<td>' + escapeHtml(u.fio || '—') + '</td>' +
            '<td>' + escapeHtml(u.role || '—') + '</td>' +
            '<td>' + escapeHtml(u.dept || '—') + '</td>' +
            '<td>' + escapeHtml(u.phone || '—') + '</td>' +
            '<td style="text-align:right; white-space:nowrap;">' +
              '<button type="button" class="btn btn--outline btn--sm" data-admin-edit-user="' + escapeHtml(u.id) + '">Редактировать</button>' +
            '</td>' +
          '</tr>';
      }).join('');
    }

    function fillForm(u) {
      if (!u) return;
      fieldId.value = u.id || '';
      if (fieldUsername) fieldUsername.value = (u.auth && u.auth.username) ? u.auth.username : '';
      if (fieldPassword) fieldPassword.value = (u.auth && u.auth.password) ? u.auth.password : '';
      fieldFio.value = u.fio || '';
      fieldShort.value = u.shortName || '';
      fieldRole.value = u.role || '';
      fieldDept.value = u.dept || '';
      fieldPhone.value = u.phone || '';
      fieldExt.value = u.ext || '';
      fieldEmail.value = u.email || '';
    }

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-admin-edit-user]') : null;
      if (!btn) return;
      var id = btn.getAttribute('data-admin-edit-user');
      if (!id) return;
      var u = getUserById(id);
      if (!u) return;
      fillForm(u);
      openModal();
    });

    if (addBtn) {
      addBtn.addEventListener('click', function () {
        fieldId.value = '';
        if (fieldUsername) fieldUsername.value = '';
        if (fieldPassword) fieldPassword.value = '';
        fieldFio.value = '';
        fieldShort.value = '';
        fieldRole.value = '';
        fieldDept.value = '';
        fieldPhone.value = '';
        fieldExt.value = '';
        fieldEmail.value = '';
        openModal();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var id = (fieldId.value || '').trim();
        var username = normalizeSpace(fieldUsername ? fieldUsername.value : '');
        var password = normalizeSpace(fieldPassword ? fieldPassword.value : '');
        if (!username || !password) {
          showToast('Укажите логин и пароль', { kind: 'error', duration: 5000 });
          return;
        }

        var u = id ? getUserById(id) : null;
        var isCreate = !u;
        if (isCreate) {
          u = {
            id: generateUserId(),
            shortName: '',
            fio: '',
            role: '',
            dept: '',
            empId: 'ТК-',
            phone: '',
            ext: '',
            email: '',
            hireDate: '',
            isAdmin: false,
            auth: { username: username, password: password },
            telecom: {
              tariff: 'Корпоративный «Офис+»',
              monthlyFee: '420 ₽/мес',
              nextChargeDate: '—',
              minutesPerMonth: 600,
              gbPerMonth: 30,
              minutesRemaining: 600,
              gbRemaining: 30,
              simConnectDate: '—',
              simNumber: '—'
            },
            requests: { accepted: [], pending: [] },
            plan: {
              period: 'Февраль 2025',
              requestsDone: 0, requestsTotal: 0,
              fieldDone: 0, fieldTotal: 0,
              cadDone: 0, cadTotal: 0,
              notes: { requests: '—', field: '—', cad: '—', total: '—' }
            }
          };
          getUsers().push(u);
          fieldId.value = u.id;
        } else {
          if (!u.auth) u.auth = { username: '', password: '' };
          u.auth.username = username;
          u.auth.password = password;
        }

        u.fio = normalizeSpace(fieldFio.value);
        u.shortName = normalizeSpace(fieldShort.value);
        u.role = normalizeSpace(fieldRole.value);
        u.dept = normalizeSpace(fieldDept.value);
        u.phone = normalizeSpace(fieldPhone.value);
        u.ext = normalizeSpace(fieldExt.value);
        u.email = normalizeSpace(fieldEmail.value);

        saveUsers();
        showToast(isCreate ? 'Сотрудник добавлен' : 'Данные сотрудника сохранены', { kind: 'success', duration: 5000 });
        closeModal();
        render();
      });
    }

    render();
  }

  /* ----- Заявки: список + данные модалки ----- */
  var REQUEST_DATA = {};
  var currentRequestId = null;

  function applyRequestOverride(key, base) {
    var o = getRequestOverrides();
    var patch = o && o[key] ? o[key] : null;
    if (!patch) return base;
    return Object.assign({}, base, patch);
  }

  function buildRequestsFromUser(user) {
    var all = [];
    function add(arr) {
      (arr || []).forEach(function (r) {
        var key = user.id + ':' + r.id;
        var base = {
          _key: key,
          _userId: user.id,
          _userName: user.shortName || user.fio || user.id,
          id: r.id,
          num: r.num,
          type: r.type,
          settlement: r.settlement,
          date: r.date,
          status: r.status,
          completedDate: r.completedDate,
          result: r.result,
          workReport: r.workReport,
          employeeComment: r.employeeComment,
          coords: r.coords,
          person: r.person
        };
        all.push(applyRequestOverride(key, base));
      });
    }
    add(user.requests && user.requests.accepted);
    add(user.requests && user.requests.pending);
    return all;
  }

  function partitionRequests(list) {
    var accepted = [];
    var pending = [];
    (list || []).forEach(function (r) {
      if ((r.status || '') === 'На рассмотрении') pending.push(r);
      else accepted.push(r);
    });
    return { accepted: accepted, pending: pending };
  }

  function buildRequestDataFromList(list) {
    var data = {};
    (list || []).forEach(function (r) {
      data[r._key] = r;
    });
    return data;
  }

  function renderRequestsTable(tbody, list, adminMode) {
    if (!tbody) return;
    if (!list || list.length === 0) {
      var cols = adminMode ? 6 : 5;
      tbody.innerHTML = '<tr><td colspan="' + cols + '" style="color: var(--text-muted); padding: 0.75rem 1rem;">Нет данных</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (r) {
      var pdfCell = (r.status === 'Выполнена')
        ? ('<button type="button" class="btn btn--outline btn--sm requests-table__pdfbtn" data-request-pdf="' + escapeHtml(r._key) + '">Скачать PDF</button>')
        : '<span style="color: var(--text-muted);">—</span>';
      var empCell = adminMode ? ('<td class="only-admin">' + escapeHtml(r._userName || '—') + '</td>') : '';
      return '' +
        '<tr class="requests-table__row-clickable" data-request-id="' + escapeHtml(r._key) + '" tabindex="0" role="button">' +
          '<td>' + escapeHtml(r.num) + '</td>' +
          empCell +
          '<td>' + escapeHtml(r.type) + '</td>' +
          '<td>' + escapeHtml(r.settlement) + '</td>' +
          '<td>' + escapeHtml(r.date) + '</td>' +
          '<td class="requests-table__pdfcell">' + pdfCell + '</td>' +
        '</tr>';
    }).join('');
  }

  function initRequestsPage(user) {
    var acceptedBody = document.getElementById('accepted-requests-body');
    var pendingBody = document.getElementById('pending-requests-body');
    if (!acceptedBody && !pendingBody) return;

    var adminMode = isAdminUser(user);
    if (document && document.body) {
      document.body.classList.toggle('is-admin', adminMode);
    }

    var allRequests = [];
    if (adminMode) {
      getUsers().forEach(function (u) {
        if (!u || !u.id) return;
        allRequests = allRequests.concat(buildRequestsFromUser(u));
      });
    } else {
      allRequests = buildRequestsFromUser(user);
    }

    var parts = partitionRequests(allRequests);
    renderRequestsTable(acceptedBody, parts.accepted, adminMode);
    renderRequestsTable(pendingBody, parts.pending, adminMode);

    REQUEST_DATA = buildRequestDataFromList(allRequests);
  }

  /* ----- Пополнение баланса ----- */
  var BALANCE_KEY = 'tambov_kadastr_balance_v2';
  var OPS_KEY = 'tambov_kadastr_balance_ops_v2';
  var defaultBalance = 0;

  function getStoredBalance() {
    try {
      var stored = localStorage.getItem(BALANCE_KEY);
      if (stored != null) {
        var num = parseFloat(stored);
        if (!isNaN(num)) return num;
      }
    } catch (e) {}
    return defaultBalance;
  }

  function setStoredBalance(value) {
    try {
      localStorage.setItem(BALANCE_KEY, String(value));
    } catch (e) {}
  }

  function getStoredOps() {
    try {
      var raw = localStorage.getItem(OPS_KEY);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr;
      }
    } catch (e) {}
    return [
      { date: '10.02.2025', text: 'Пополнение +500 \u20BD' },
      { date: '28.01.2025', text: 'Списание за тариф −350 \u20BD' },
      { date: '15.01.2025', text: 'Пополнение +500 \u20BD' }
    ];
  }

  function setStoredOps(ops) {
    try {
      localStorage.setItem(OPS_KEY, JSON.stringify(ops.slice(0, 20)));
    } catch (e) {}
  }

  function renderBalanceOps(ops) {
    var list = document.getElementById('balance-ops-list');
    if (!list) return;
    var esc = function (s) {
      var div = document.createElement('div');
      div.textContent = s;
      return div.innerHTML;
    };
    list.innerHTML = ops.map(function (op) {
      return '<li class="cabinet__op"><span class="cabinet__op-date">' + esc(op.date) + '</span> ' + esc(op.text) + '</li>';
    }).join('');
  }

  var currentBalance = getStoredBalance();

  function formatBalance(value) {
    return value.toFixed(2).replace('.', ',') + ' \u20BD';
  }

  function updateBalanceDisplay() {
    var el = document.getElementById('balance-display');
    if (el) {
      el.textContent = formatBalance(currentBalance);
      el.setAttribute('data-balance', currentBalance.toFixed(2));
    }
    setStoredBalance(currentBalance);
  }

  function openTopupModal() {
    var modal = document.getElementById('modal-topup');
    if (!modal) return;
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('modal-topup-success').setAttribute('hidden', '');
    document.getElementById('form-topup').removeAttribute('hidden');
    document.getElementById('topup-amount').value = '';
    document.getElementById('topup-card').value = '';
    document.getElementById('topup-amount-error').textContent = '';
    document.getElementById('topup-card-error').textContent = '';
    document.getElementById('topup-amount').focus();
    document.body.style.overflow = 'hidden';
  }

  function closeTopupModal() {
    var modal = document.getElementById('modal-topup');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function initTopupModal() {
    var btnTopup = document.getElementById('btn-topup');
    var modal = document.getElementById('modal-topup');
    var btnClose = document.getElementById('modal-topup-close');
    var btnCancel = document.getElementById('modal-topup-cancel');
    var backdrop = document.getElementById('modal-topup-backdrop');
    var form = document.getElementById('form-topup');
    var successBlock = document.getElementById('modal-topup-success');
    var successAmount = document.getElementById('success-amount');
    var btnOk = document.getElementById('modal-topup-ok');
    var inputAmount = document.getElementById('topup-amount');
    var inputCard = document.getElementById('topup-card');
    var errorAmount = document.getElementById('topup-amount-error');
    var errorCard = document.getElementById('topup-card-error');

    if (!modal || !form) return;

    function showSuccess(amount) {
      form.setAttribute('hidden', '');
      successBlock.removeAttribute('hidden');
      successAmount.textContent = amount.toFixed(2).replace('.', ',') + ' \u20BD';
    }

    if (btnTopup) {
      btnTopup.addEventListener('click', openTopupModal);
    }
    if (btnClose) btnClose.addEventListener('click', closeTopupModal);
    if (btnCancel) btnCancel.addEventListener('click', closeTopupModal);
    if (backdrop) backdrop.addEventListener('click', closeTopupModal);
    if (btnOk) {
      btnOk.addEventListener('click', function () {
        closeTopupModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeTopupModal();
      }
    });

    /* Маска номера карты */
    if (inputCard) {
      inputCard.addEventListener('input', function () {
        var v = this.value.replace(/\D/g, '').slice(0, 16);
        var parts = [];
        for (var i = 0; i < v.length; i += 4) {
          parts.push(v.slice(i, i + 4));
        }
        this.value = parts.join(' ');
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorAmount.textContent = '';
      errorCard.textContent = '';

      var amountRaw = inputAmount.value.trim();
      var amount = parseFloat(amountRaw);
      var valid = true;

      if (amountRaw === '' || isNaN(amount)) {
        errorAmount.textContent = 'Укажите сумму';
        valid = false;
      } else if (amount < 100) {
        errorAmount.textContent = 'Минимум 100 ₽';
        valid = false;
      } else if (amount > 15000) {
        errorAmount.textContent = 'Максимум 15 000 ₽';
        valid = false;
      }

      var cardRaw = (inputCard && inputCard.value) ? inputCard.value.replace(/\s/g, '') : '';
      if (cardRaw.length > 0 && cardRaw.length < 16) {
        errorCard.textContent = 'Введите 16 цифр карты';
        valid = false;
      }

      if (!valid) return;

      currentBalance += amount;
      setStoredBalance(currentBalance);
      var el = document.getElementById('balance-display');
      if (el) {
        el.textContent = formatBalance(currentBalance);
        el.setAttribute('data-balance', currentBalance.toFixed(2));
      }

      var today = new Date();
      var dateStr = ('0' + today.getDate()).slice(-2) + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + today.getFullYear();
      var ops = getStoredOps();
      ops.unshift({ date: dateStr, text: 'Пополнение +' + amount.toFixed(2).replace('.', ',') + ' \u20BD' });
      setStoredOps(ops);
      renderBalanceOps(ops);

      showSuccess(amount);
    });
  }

  /* ----- Онлайн-чат поддержки ----- */
  function getOperatorReply(userText) {
    var t = (userText || '').toLowerCase();
    if (t.indexOf('баланс') !== -1 || t.indexOf('пополн') !== -1) {
      return 'Пополнение баланса SIM-карты доступно в разделе «Личный кабинет» — кнопка «Пополнить». При проблемах со списанием обратитесь по тел. +7 (4752) 55-50-50.';
    }
    if (t.indexOf('заявк') !== -1 || t.indexOf('документ') !== -1) {
      return 'Статус заявок отображается во вкладке «Заявки». По клику на строку открывается полная информация. Для уточнения сроков звоните в поддержку.';
    }
    if (t.indexOf('тариф') !== -1 || t.indexOf('минут') !== -1 || t.indexOf('интернет') !== -1) {
      return 'Детали тарифа и остатки минут/интернета указаны в личном кабинете. Смена тарифа — через заявку в отдел кадров или по тел. 55-50-50.';
    }
    if (t.indexOf('здравств') !== -1 || t.indexOf('привет') !== -1 || t.indexOf('добрый') !== -1) {
      return 'Здравствуйте! Опишите, пожалуйста, ваш вопрос — постараюсь помочь.';
    }
    if (t.indexOf('спасибо') !== -1 || t.indexOf('благодар') !== -1) {
      return 'Пожалуйста! Обращайтесь, если появятся ещё вопросы. Хорошего дня!';
    }
    return 'Принято. Если нужна детальная консультация, позвоните по номеру +7 (4752) 55-50-50 (Пн–Пт, 9:00–18:00). Могу уточнить что-то ещё по личному кабинету?';
  }

  function addChatMessage(author, text, isUser) {
    var container = document.getElementById('chat-messages');
    if (!container) return;
    var now = new Date();
    var timeStr = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
    var div = document.createElement('div');
    div.className = 'chat__msg chat__msg--' + (isUser ? 'user' : 'operator');
    div.innerHTML = '<span class="chat__msg-author">' + (isUser ? 'Вы' : 'Оператор') + '</span>' +
      '<span class="chat__msg-text">' + escapeHtml(text) + '</span>' +
      '<span class="chat__msg-time">' + timeStr + '</span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function initSupportChat() {
    var form = document.getElementById('chat-form');
    var input = document.getElementById('chat-input');
    if (!form || !input) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = (input.value || '').trim();
      if (!text) return;

      addChatMessage('Вы', text, true);
      input.value = '';

      var reply = getOperatorReply(text);
      setTimeout(function () {
        addChatMessage('Оператор', reply, false);
      }, 800 + Math.random() * 700);
    });
  }

  /* ----- Главная: "О компании" -> краткие описания ----- */
  var COMPANY_TOPICS = {
    cadastre: {
      title: 'Кадастровый учёт',
      text: 'Постановка объектов на учёт, внесение изменений и сопровождение процедур по актуализации сведений в реестре.'
    },
    survey: {
      title: 'Межевание',
      text: 'Определение и согласование границ участков, подготовка межевых планов и материалов для корректного отображения границ.'
    },
    docs: {
      title: 'Проверка документов',
      text: 'Первичная экспертиза комплектности и корректности документов, выявление ошибок и подготовка рекомендаций по исправлению.'
    },
    field: {
      title: 'Выезды на объекты',
      text: 'Осмотры и замеры на месте, уточнение фактических данных, фиксация особенностей объекта для дальнейшей обработки.'
    },
    quality: {
      title: 'Контроль качества',
      text: 'Проверка материалов и итоговых документов, соблюдение регламентов и стандартов, снижение числа возвратов и доработок.'
    }
  };

  function closeCompanyModal() {
    var modal = document.getElementById('modal-company');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function openCompanyModal(topicKey) {
    var modal = document.getElementById('modal-company');
    var titleEl = document.getElementById('modal-company-title');
    var textEl = document.getElementById('modal-company-text');
    var topic = COMPANY_TOPICS[topicKey];
    if (!modal || !titleEl || !textEl || !topic) return;

    titleEl.textContent = topic.title;
    textEl.textContent = topic.text;

    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function initCompanyTopics() {
    var items = document.querySelectorAll('[data-company-topic]');
    if (!items || items.length === 0) return;

    var modal = document.getElementById('modal-company');
    var btnClose = document.getElementById('modal-company-close');
    var backdrop = document.getElementById('modal-company-backdrop');

    function handleOpen(e) {
      if (e.key && e.key !== 'Enter' && e.key !== ' ') return;
      if (e.key) e.preventDefault();
      var key = e.currentTarget.getAttribute('data-company-topic');
      if (key) openCompanyModal(key);
    }

    items.forEach(function (el) {
      el.addEventListener('click', handleOpen);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') handleOpen(e);
      });
    });

    if (btnClose) btnClose.addEventListener('click', closeCompanyModal);
    if (backdrop) backdrop.addEventListener('click', closeCompanyModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
        closeCompanyModal();
      }
    });
  }

  function init() {
    requireAuthIfNeeded();
    consumeQueuedToast();

    var user = getCurrentUser();
    if (document && document.body) {
      document.body.classList.toggle('is-admin', isAdminUser(user));
    }
    setHeaderUserName(user);
    updateBalanceDisplay();
    var ops = getStoredOps();
    renderBalanceOps(ops);
    initNavActive();
    initGotoLinks();
    initCompanyTopics();
    initMapPage();
    initLoginPage();
    if (user) {
      initCabinetPage(user);
      initRequestsPage(user);
      initPlanPage(user);
    }
    initRequestModal();
    initLogout();
    initTopupModal();
    initSupportChat();
    initAdminPage(user);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
