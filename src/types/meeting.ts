import { IUserProfile } from "./user";

/**
 * TODO: Handle Meeting
 */;

export interface IMeeting {
  id?: string;
  doctor: IUserProfile;
  member?: null | IUserProfile;
  avai: boolean;
  datetime: Date;
  note?: string;
}

/**
 * BS sẽ tạo lịch avai trong 1 tuần.
 * 
 * Member chọn chuyên gia => Chọn lịch mà BS avai => Note thông tin bổ sung => Đặt lịch
 *    => Lưu lên lịch của bác sĩ và gửi Member ID và Password Zoom
 * 
 */
