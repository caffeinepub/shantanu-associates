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
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Testimonial {
    content: string;
    clientName: string;
    role: string;
}
export interface backendInterface {
    addTestimonial(clientName: string, role: string, content: string): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
}
