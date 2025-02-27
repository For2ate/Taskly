export interface AddNewBoardModel {
  userId: string;
  name: string;
  color: string;
}

export interface BoardModel {
  id: string;
  name: string;
  color: string;
}

export interface StickerModel {
  id: string;
  header: string;
  text: string;
  priority: number;
  dateStart: string;
  dateEnd: string;
}
