// types/member.ts
export interface Member {
  id: string;
  name: string;
  position: string;
  photo: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  verified?: boolean;
}