import { Comment, Rating } from "@prisma/client";
import { DateTime } from "luxon";

export const COMMENT_VALIDATION_ERRORS = Object.freeze({
    INVALID_COMMENT: "Comments must be between 3 and 500 characters.",
    INVALID_DATE: "Date must be valid.",
})

export const RATING_VALIDATION_ERRORS = Object.freeze({
    INVALID_RATING: "Rating must be an integer between 1 and 5."
})

export const comment = (text: string, date: string): string | null => {
    if(!text || text.length < 3 || text.length > 500) return COMMENT_VALIDATION_ERRORS.INVALID_COMMENT
    if (!DateTime.fromISO(date).isValid) return COMMENT_VALIDATION_ERRORS.INVALID_DATE
}

export const rating = (points: number): string | null => {
    if (!points || points < 1 || points > 5 || points !== ~~points) return RATING_VALIDATION_ERRORS.INVALID_RATING
    return null
}

