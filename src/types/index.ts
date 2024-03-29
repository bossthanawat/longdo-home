type RawResidential = {
  row_number: string;
  project_id: string;
  name_en?: string; 
  name_th?: string;
  propertytype_id: string;
  propertytype_name_en?: string;
  propertytype_name_th?: string;
  price_min: string; 
  developer_id?: string;
  developer_name_en?: string;
  developer_name_th?: string;
  latitude: string; 
  longitude: string;
  neighborhood_id?: string;
  neighborhood_name_en?: string;
  neighborhood_name_th?: string;
  subdistrict_id?: string;
  subdistrict_name_en?: string;
  subdistrict_name_th?: string;
  district_id?: string;
  district_name_en?: string;
  district_name_th?: string;
  province_id?: string;
  province_name_en?: string;
  province_name_th?: string;
  zipcode?: string;
  count_elevator?: string; 
  count_elevator_service?: string;
  count_floor?: string;
  count_parking?: string;
  count_tower?: string;
  count_unit?: string;
  count_unittype?: string;
  facility_clubhouse?: string; 
  facility_fitness?: string;
  facility_meeting?: string;
  facility_park?: string;
  facility_playground?: string;
  facility_pool?: string;
  facility_security?: string;
  date_created?: string; 
  date_finish?: string;
  date_updated?: string;
  source?: string;
  url_project?: string;
  day?: string; 
};


type PropertyTypeValue = {
  id: string;
  name_en: string;
  name_th: string;
}

type ProvinceValue = {
  row_number: string;
  b_prov_id: string;
  b_prov_code: string;
  b_prov_name_en: string;
  b_prov_name_th: string;
  b_region_code: string;
  b_region_name_th: string;
}


type ResidentialValue = {
  property_type: PropertyTypeValue;
  province: ProvinceValue;
} & RawResidential