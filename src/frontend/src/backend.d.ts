import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface Shayari {
    id: bigint;
    createdAt: Time;
    text: string;
    author: string;
    likes: bigint;
    category: Category;
}
export enum Category {
    sad = "sad",
    friendship = "friendship",
    love = "love",
    attitude = "attitude",
    motivational = "motivational"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addShayari(text: string, author: string, category: Category): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLikedShayariIds(user: Principal): Promise<Array<bigint>>;
    getRandomShayari(category: Category): Promise<Shayari | null>;
    getShayariByCategory(category: Category, page: bigint, pageSize: bigint): Promise<Array<Shayari>>;
    getTrending(page: bigint, pageSize: bigint): Promise<Array<Shayari>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    likeShayari(shayariId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchShayari(keyword: string): Promise<Array<Shayari>>;
    unlikeShayari(shayariId: bigint): Promise<void>;
}
