export type Site = {
	contactInfos: ContactInfo[];
	address: Address;
};

export type ContactInfo = {
	isEmergency: boolean;
	isPrimary: boolean;
	isVerified: boolean;
	type: string;
	value: string;
};

export type Address = {
	city: string;
	coords: { lng: number; lat: number };
	country: string;
	number: string;
	street: string;
	zipCode: string;
};
