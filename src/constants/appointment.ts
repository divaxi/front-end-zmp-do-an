export const APPOINTMENT_STATUS = {
  scheduled: 1, // Đã đặt lịch
  canceled: 2, // Đã hủy
  rescheduled: 3, // Đã dời lịch
  waiting: 4, // Đang chờ khám
  inProgress: 5, // Đang được khám
  completed: 6, // Đã hoàn tất
  noShow: 7, // Không đến
  followUpNeeded: 8, // Cần tái khám
};

export const APPOINTMENT_STATUS_TEXT = {
  [APPOINTMENT_STATUS.scheduled]: "Đã đặt lịch",
  [APPOINTMENT_STATUS.canceled]: "Đã hủy",
  [APPOINTMENT_STATUS.rescheduled]: "Đã dời lịch",
  [APPOINTMENT_STATUS.waiting]: "Đang chờ khám",
  [APPOINTMENT_STATUS.inProgress]: "Đang được khám",
  [APPOINTMENT_STATUS.completed]: "Đã hoàn tất",
  [APPOINTMENT_STATUS.noShow]: "Không đến",
  [APPOINTMENT_STATUS.followUpNeeded]: "Cần tái khám",
};

export const APPOINTMENT_STATUS_COLOR = {
  [APPOINTMENT_STATUS.scheduled]: "#0ea5e9",
  [APPOINTMENT_STATUS.canceled]: "#cc454e",
  [APPOINTMENT_STATUS.rescheduled]: "#ffa883",
  [APPOINTMENT_STATUS.waiting]: "#f97316",
  [APPOINTMENT_STATUS.inProgress]: "#dfb55c",
  [APPOINTMENT_STATUS.completed]: "#22c55e",
  [APPOINTMENT_STATUS.noShow]: "#cc454e",
  [APPOINTMENT_STATUS.followUpNeeded]: "#5400ff",
};
