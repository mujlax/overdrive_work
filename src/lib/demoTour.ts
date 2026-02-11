import { driver, type DriveStep, type Config } from 'driver.js'

const TOUR_DONE_KEY = 'overdrive_tour_done'

const steps: DriveStep[] = [
  {
    element: '[data-tour="header"]',
    popover: {
      title: 'О сервисе',
      description:
        'Баланс нагрузки команды: часы переработок по неделям, статусы относительно медианы по выборке. Цель — выровнять нагрузку и вовремя перераспределять задачи. Демо можно перезапустить кнопкой «Демо» в шапке.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="summary"]',
    popover: {
      title: 'Сводка',
      description:
        'Всего часов переработок, количество специалистов с переработками, выше нормы и ниже нормы. Показатели считаются по текущей выборке (с учётом фильтров).',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="main-content"]',
    popover: {
      title: 'Данные',
      description:
        'Таблица с закреплёнными колонками и горизонтальной прокруткой по периодам или график по всем специалистам.',
      side: 'top',
      align: 'start',
    },
  },
  {
    element: '[data-tour="column-status"]',
    popover: {
      title: 'Статус',
      description:
        'Выше нормы, в норме или ниже нормы относительно медианы по выборке (±20%). Показывает, нужен ли специалисту отдых или можно подгрузить задачами.',
      side: 'left',
      align: 'center',
    },
  },
  {
    element: '[data-tour="column-explanation"]',
    popover: {
      title: 'Объяснение',
      description:
        'Профиль нагрузки:\n• разовый пик — одна активная неделя\n• хроническая (все 3 мес) — переработки все три месяца\n• свежая перегрузка — большая доля в последнем месяце\n• равномерно — нагрузка распределена\n• нет данных — переработок не было\n\nПлюс: последняя неделя с переработкой, пик и итог по февралю.\nПо клику на строку — подробнее.',
      side: 'left',
      align: 'center',
      showButtons: ['close'],
    },
  },
]

const defaultConfig: Config = {
  steps,
  showProgress: true,
  nextBtnText: 'Далее',
  prevBtnText: 'Назад',
  doneBtnText: 'Закрыть',
  allowClose: true,
  overlayColor: 'rgba(0, 0, 0, 0.7)',
  onDestroyed: () => {
    localStorage.setItem(TOUR_DONE_KEY, '1')
  },
}

let driverInstance: ReturnType<typeof driver> | null = null

export function runDemoTour(): void {
  if (driverInstance?.isActive()) {
    driverInstance.destroy()
  }
  driverInstance = driver(defaultConfig)
  driverInstance.drive()
}

export { TOUR_DONE_KEY }
