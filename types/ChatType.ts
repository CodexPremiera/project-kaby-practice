export interface Message {
    id: string;
    request_id: string;
    message: string;
    sent_at: string;
    sender_id: string;
}

export interface Remark {
    id: string;
    request_id: string;
    content: string;
    sent_at: string;
}