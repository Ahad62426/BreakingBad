export interface Character {
  char_id?: number | undefined;
  img?: string | undefined;
  name?: string | undefined;
  occupation?: string[] | undefined;
  status?: string | undefined;
  nickname?: string | undefined;
  appearance?: number[] | undefined;
}

export interface Appearance {
  label: string;
  value: number;
}
