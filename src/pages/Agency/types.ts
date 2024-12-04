export interface AgencyType {
    imageUrl: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface AgencyResponse {
    uuid:              string;
    user:              string;
    full_agency_name:  string;
    website_link:      string;
    requirements_link: string;
    description:       string;
    created_at:        Date;
    updated_at:        Date;
}
