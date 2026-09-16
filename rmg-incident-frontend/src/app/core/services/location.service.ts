import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationResponse } from '../models/models';
import { map, Observable } from 'rxjs';

export interface PincodeResponse {
  Message: string | null;
  Status: string;
  PostOffice: PostOffice[];
}

export interface PostOffice {
  Name: string;
  Description: string | null;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

export interface LocationResult {
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Country {
  code: string;       // e.g., 'US', 'IN'
  name: string;       // e.g., 'United States'
  phoneCode: string;  // e.g., '+1', '+91'
}

export interface City {
  name: string;
  countryCode: string;
}

@Injectable({ providedIn: 'root' })
export class LocationService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/api/location';
 private readonly apiUrl =
    'https://api.postalpincode.in/pincode';

   private countries: Country[] = [
    { code: 'US', name: 'United States', phoneCode: '+1' },
    { code: 'IN', name: 'India', phoneCode: '+91' },
    { code: 'UK', name: 'United Kingdom', phoneCode: '+44' },
    {name:"Pakistan","phoneCode":"+92",code:"PK"},
    {name:"Netherlands",phoneCode:"+31",code:"NL"},
    {name:"Nepal",phoneCode:"+977",code:"NP"},
    
{name:"Palau",phoneCode:"680",code:"PW"},
{name:"Palestine",phoneCode:"+970",code:"PS"},
{name:"Panama",phoneCode:"+507",code:"PA"},
{name:"Papua New Guinea",phoneCode:"+675",code:"PG"},
{name:"Paraguay",phoneCode:"+595",code:"PY"},
{name:"Peru",phoneCode:"+51",code:"PE"},
{name:"Philippines",phoneCode:"+63",code:"PH"},
{name:"Pitcairn",phoneCode:"+64",code:"PN"},
{name:"Poland",phoneCode:"+48",code:"PL"},
{name:"Portugal",phoneCode:"+351",code:"PT"},
{name:"Puerto Rico",phoneCode:"+1-787, 1-939",code:"PR"},
{name:"Qatar",phoneCode:"+974",code:"QA"},
{name:"Republic of the Congo",phoneCode:"+242",code:"CG"},
{name:"Reunion",phoneCode:"+262",code:"RE"},
{name:"Romania",phoneCode:"+40",code:"RO"},
{name:"Russia",phoneCode:"+7",code:"RU"},
{name:"Rwanda",phoneCode:"+250",code:"RW"},
{name:"Saint Barthelemy",phoneCode:"+590",code:"BL"},
{name:"Saint Helena",phoneCode:"+290",code:"SH"},
{name:"Saint Kitts and Nevis",phoneCode:"1-869",code:"KN"},
{name:"Saint Lucia",phoneCode:"1-758",code:"LC"},
{name:"Saint Martin",phoneCode:"+590",code:"MF"},
{name:"Saint Pierre and Miquelon",phoneCode:"508",code:"PM"},
{name:"Saint Vincent and the Grenadines",phoneCode:"1-784",code:"VC"},
{name:"Samoa",phoneCode:"685",code:"WS"},
{name:"San Marino",phoneCode:"378",code:"SM"},
{name:"Sao Tome and Principe",phoneCode:"239",code:"ST"},
{name:"Saudi Arabia",phoneCode:"966",code:"SA"},
{name:"Senegal",phoneCode:"221",code:"SN"},
{name:"Serbia",phoneCode:"381",code:"RS"},
{name:"Seychelles",phoneCode:"248",code:"SC"},
{name:"Sierra Leone",phoneCode:"232",code:"SL"},
{name:"Singapore",phoneCode:"65",code:"SG"},
{name:"Sint Maarten",phoneCode:"1-721",code:"SX"},
{name:"Slovakia",phoneCode:"421",code:"SK"},
{name:"Slovenia",phoneCode:"386",code:"SI"},
{name:"Solomon Islands",phoneCode:"677",code:"SB"},
{name:"Somalia",phoneCode:"252",code:"SO"},
{name:"South Africa",phoneCode:"27",code:"ZA"},
{name:"South Korea",phoneCode:"82",code:"KR"},
{name:"South Sudan",phoneCode:"211",code:"SS"},
{name:"Spain",phoneCode:"34",code:"ES"},
{name:"Sri Lanka",phoneCode:"94",code:"LK"},
{name:"Sudan",phoneCode:"249",code:"SD"},
{name:"Suriname",phoneCode:"597",code:"SR"},
{name:"Svalbard and Jan Mayen",phoneCode:"47",code:"SJ"},
{name:"Swaziland",phoneCode:"268",code:"SZ"},
{name:"Sweden",phoneCode:"46",code:"SE"},
{name:"Switzerland",phoneCode:"41",code:"CH"},
{name:"Syria",phoneCode:"963",code:"SY"},
{name:"Taiwan",phoneCode:"886",code:"TW"},
{name:"Tajikistan",phoneCode:"992",code:"TJ"},
{name:"Tanzania",phoneCode:"255",code:"TZ"},
{name:"Thailand",phoneCode:"66",code:"TH"},
  ];

  private cities: City[] = [
    { name: 'New York', countryCode: 'US' },
    { name: 'Los Angeles', countryCode: 'US' },
    { name: 'Mumbai', countryCode: 'IN' },
    { name: 'Delhi', countryCode: 'IN' },
    { name: 'London', countryCode: 'UK' },
    { name: 'Manchester', countryCode: 'UK' }

    
  ];

  getCountries(): Country[] {
    return this.countries;
  }

  getCitiesByCountry(countryCode: string): City[] {
    return this.cities.filter(city => city.countryCode === countryCode);
  }

  getByPin(pinCode: string) {
    return this.http.get<LocationResponse>(`${this.base}/pincode/${pinCode}`);
  }

    getLocationByPincode(
    pincode: string
  ): Observable<LocationResult> {

    return this.http
      .get<PincodeResponse[]>(
        `${this.apiUrl}/${pincode}`
      )
      .pipe(

        map(response => {

          const result = response?.[0];

          if (
            !result ||
            result.Status !== 'Success' ||
            !result.PostOffice?.length
          ) {
            throw new Error(
              'Invalid PIN code'
            );
          }

          const postOffice =
            result.PostOffice[0];

          return {
            city: postOffice.District,
            state: postOffice.State,
            country: postOffice.Country,
            pincode: postOffice.Pincode
          };
        })
      );
  }
}