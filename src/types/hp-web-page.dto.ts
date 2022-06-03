export interface HpWebPageDto {
	key: string;
	title: string;
	firstName: string;
	lastName: string;
	language: any;
	specialtyLabel?: string;
	nihii?: string;
	bookingPreferences: any;
	profilePictureUrl: string;
	legalGender?: any;
	// publicProfileV2:
	about?: string;
	allowedPaymentTypes?: any[];
	temporaryMessage?: any;
	convention?: any;
	website?: string;
	spokenLanguages?: Array<string>;
	trainings?: Array<string>;
	specializations?: Array<string>;
	specialty?: any;
	id: string;
	sites: any[];
	calendars: Array<any>;
	motives: Motive[];
}

export type Motive = {
	id: string;
	label: string;
	duration: number;
};

export type Site = {
	id: string;
	name: string;
};

export type Calendar = {
	id: string;
	ownerId: string;
	siteId: string;
};
