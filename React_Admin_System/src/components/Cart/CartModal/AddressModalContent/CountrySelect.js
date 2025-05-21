import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './CountrySelect.css'

const CountrySelect = ({ setCountry, country }) => {
    const [countryModal, setCountryModal] = useState(false)
    const options = [
        { value: 'United Kingdom', isocode: 'GBR' },
        { value: 'United States', isocode: 'USA' },
        { value: 'Afghanistan', isocode: 'AFG' },
        { value: 'Albania', isocode: 'ALB' },
        { value: 'Algeria', isocode: 'DZA' },
        { value: 'American Samoa', isocode: 'ASM' },
        { value: 'Andorra', isocode: 'AND' },
        { value: 'Angola', isocode: 'AGO' },
        { value: 'Anguilla', isocode: 'AIA' },
        { value: 'Antarctica', isocode: 'ATA' },
        { value: 'Antigua and Barbuda', isocode: 'ATG' },
        { value: 'Argentina', isocode: 'ARG' },
        { value: 'Armenia', isocode: 'ARM' },
        { value: 'Aruba', isocode: 'ABW' },
        { value: 'Australia', isocode: 'AUS' },
        { value: 'Austria', isocode: 'AUT' },
        { value: 'Azerbaijan', isocode: 'AZE' },
        { value: 'Bahamas', isocode: 'BHS' },
        { value: 'Bahrain', isocode: 'BHR' },
        { value: 'Bangladesh', isocode: 'BGD' },
        { value: 'Barbados', isocode: 'BRB' },
        { value: 'Belarus', isocode: 'BLR' },
        { value: 'Belgium', isocode: 'BEL' },
        { value: 'Belize', isocode: 'BLZ' },
        { value: 'Benin', isocode: 'BEN' },
        { value: 'Bermuda', isocode: 'BMU' },
        { value: 'Bhutan', isocode: 'BTN' },
        { value: 'Bolivia, Plurinational State Of', isocode: 'BOL' },
        { value: 'Bosnia and Herzegovina', isocode: 'BIH' },
        { value: 'Botswana', isocode: 'BWA' },
        { value: 'Bouvet Island', isocode: 'BVT' },
        { value: 'Brazil', isocode: 'BRA' },
        { value: 'British Indian Ocean Territory', isocode: 'IOT' },
        { value: 'Brunei Darussalam', isocode: 'BRN' },
        { value: 'Bulgaria', isocode: 'BGR' },
        { value: 'Burkina Faso', isocode: 'BFA' },
        { value: 'Burundi', isocode: 'BDI' },
        { value: 'Cambodia', isocode: 'KHM' },
        { value: 'Cameroon', isocode: 'CMR' },
        { value: 'Canada', isocode: 'CAN' },
        { value: 'Cape Verde', isocode: 'CPV' },
        { value: 'Cayman Islands', isocode: 'CYM' },
        { value: 'Central African Republic', isocode: 'CAF' },
        { value: 'Chad', isocode: 'TCD' },
        { value: 'Chile', isocode: 'CHL' },
        { value: 'China', isocode: 'CHN' },
        { value: 'Christmas Island', isocode: 'CXR' },
        { value: 'Cocos (Keeling) Islands', isocode: 'CCK' },
        { value: 'Colombia', isocode: 'COL' },
        { value: 'Comoros', isocode: 'COM' },
        { value: 'Congo', isocode: 'COG' },
        { value: 'Congo, The Democratic Republic of The', isocode: 'COD' },
        { value: 'Cook Islands', isocode: 'COK' },
        { value: 'Costa Rica', isocode: 'CRI' },
        { value: 'Côte D&apos;Ivoire', isocode: 'CIV' },
        { value: 'Croatia', isocode: 'HRV' },
        { value: 'Cuba', isocode: 'CUB' },
        { value: 'Cyprus', isocode: 'CYP' },
        { value: 'Czech Republic', isocode: 'CZE' },
        { value: 'Denmark', isocode: 'DNK' },
        { value: 'Djibouti', isocode: 'DJI' },
        { value: 'Dominica', isocode: 'DMA' },
        { value: 'Dominican Republic', isocode: 'DOM' },
        { value: 'Ecuador', isocode: 'ECU' },
        { value: 'Egypt', isocode: 'EGY' },
        { value: 'El Salvador', isocode: 'SLV' },
        { value: 'Equatorial Guinea', isocode: 'GNQ' },
        { value: 'Eritrea', isocode: 'ERI' },
        { value: 'Estonia', isocode: 'EST' },
        { value: 'Ethiopia', isocode: 'ETH' },
        { value: 'Falkland Islands (MALVINAS)', isocode: 'FLK' },
        { value: 'Faroe Islands', isocode: 'FRO' },
        { value: 'Fiji', isocode: 'FJI' },
        { value: 'Finland', isocode: 'FIN' },
        { value: 'France', isocode: 'FRA' },
        { value: 'French Guiana', isocode: 'GUF' },
        { value: 'French Polynesia', isocode: 'PYF' },
        { value: 'French Southern Territories', isocode: 'ATF' },
        { value: 'Gabon', isocode: 'GAB' },
        { value: 'Gambia', isocode: 'GMB' },
        { value: 'Georgia', isocode: 'GEO' },
        { value: 'Germany', isocode: 'DEU' },
        { value: 'Ghana', isocode: 'GHA' },
        { value: 'Gibraltar', isocode: 'GIB' },
        { value: 'Greece', isocode: 'GRC' },
        { value: 'Greenland', isocode: 'GRL' },
        { value: 'Grenada', isocode: 'GRD' },
        { value: 'Guadeloupe', isocode: 'GLP' },
        { value: 'Guam', isocode: 'GUM' },
        { value: 'Guatemala', isocode: 'GTM' },
        { value: 'Guernsey', isocode: 'GGY' },
        { value: 'Guinea', isocode: 'GIN' },
        { value: 'Guinea-Bissau', isocode: 'GNB' },
        { value: 'Guyana', isocode: 'GUY' },
        { value: 'Haiti', isocode: 'HTI' },
        { value: 'Heard Island And McDonald Islands', isocode: 'HMD' },
        { value: 'Holy See (Vatican City State)', isocode: 'VAT' },
        { value: 'Honduras', isocode: 'HND' },
        { value: 'Hong Kong', isocode: 'HKG' },
        { value: 'Hungary', isocode: 'HUN' },
        { value: 'Iceland', isocode: 'ISL' },
        { value: 'India', isocode: 'IND' },
        { value: 'Indonesia', isocode: 'IDN' },
        { value: 'Iran, Islamic Republic Of', isocode: 'IRN' },
        { value: 'Iraq', isocode: 'IRQ' },
        { value: 'Ireland', isocode: 'IRL' },
        { value: 'Isle Of Man', isocode: 'IMN' },
        { value: 'Israel', isocode: 'ISR' },
        { value: 'Italy', isocode: 'ITA' },
        { value: 'Jamaica', isocode: 'JAM' },
        { value: 'Japan', isocode: 'JPN' },
        { value: 'Jersey', isocode: 'JEY' },
        { value: 'Jordan', isocode: 'JOR' },
        { value: 'Kazakhstan', isocode: 'KAZ' },
        { value: 'Kenya', isocode: 'KEN' },
        { value: 'Kiribati', isocode: 'KIR' },
        { value: 'Korea, Democratic People&apos;s Republic of', isocode: 'PRK' },
        { value: 'Korea, Republic of', isocode: 'KOR' },
        { value: 'Kuwait', isocode: 'KWT' },
        { value: 'Kyrgyzstan', isocode: 'KGZ' },
        { value: 'Lao People&apos;s Democratic Republic', isocode: 'LAO' },
        { value: 'Latvia', isocode: 'LVA' },
        { value: 'Lebanon', isocode: 'LBN' },
        { value: 'Lesotho', isocode: 'LSO' },
        { value: 'Liberia', isocode: 'LBR' },
        { value: 'Libyan Arab Jamahiriya', isocode: 'LBY' },
        { value: 'Liechtenstein', isocode: 'LIE' },
        { value: 'Lithuania', isocode: 'LTU' },
        { value: 'Luxembourg', isocode: 'LUX' },
        { value: 'Macao', isocode: 'MAC' },
        { value: 'Macedonia, The Former Yugoslav Republic Of', isocode: 'MKD' },
        { value: 'Madagascar', isocode: 'MDG' },
        { value: 'Malawi', isocode: 'MWI' },
        { value: 'Malaysia', isocode: 'MYS' },
        { value: 'Maldives', isocode: 'MDV' },
        { value: 'Mali', isocode: 'MLI' },
        { value: 'Malta', isocode: 'MLT' },
        { value: 'Marshall Islands', isocode: 'MHL' },
        { value: 'Martinique', isocode: 'MTQ' },
        { value: 'Mauritania', isocode: 'MRT' },
        { value: 'Mauritius', isocode: 'MUS' },
        { value: 'Mayotte', isocode: 'MYT' },
        { value: 'Mexico', isocode: 'MEX' },
        { value: 'Micronesia, Federated States of', isocode: 'FSM' },
        { value: 'Moldova, Republic of', isocode: 'MDA' },
        { value: 'Monaco', isocode: 'MCO' },
        { value: 'Mongolia', isocode: 'MNG' },
        { value: 'Montenegro', isocode: 'MNE' },
        { value: 'Montserrat', isocode: 'MSR' },
        { value: 'Morocco', isocode: 'MAR' },
        { value: 'Mozambique', isocode: 'MOZ' },
        { value: 'Myanmar', isocode: 'MMR' },
        { value: 'Namibia', isocode: 'NAM' },
        { value: 'Nauru', isocode: 'NRU' },
        { value: 'Nepal', isocode: 'NPL' },
        { value: 'Netherlands', isocode: 'NLD' },
        { value: 'Netherlands Antilles', isocode: 'ANT' },
        { value: 'New Caledonia', isocode: 'NCL' },
        { value: 'New Zealand', isocode: 'NZL' },
        { value: 'Nicaragua', isocode: 'NIC' },
        { value: 'Niger', isocode: 'NER' },
        { value: 'Nigeria', isocode: 'NGA' },
        { value: 'Niue', isocode: 'NIU' },
        { value: 'Norfolk Island', isocode: 'NFK' },
        { value: 'Northern Mariana Islands', isocode: 'MNP' },
        { value: 'Norway', isocode: 'NOR' },
        { value: 'Oman', isocode: 'OMN' },
        { value: 'Pakistan', isocode: 'PAK' },
        { value: 'Palau', isocode: 'PLW' },
        { value: 'Palestinian Territory, Occupied', isocode: 'PSE' },
        { value: 'Panama', isocode: 'PAN' },
        { value: 'Papua New Guinea', isocode: 'PNG' },
        { value: 'Paraguay', isocode: 'PRY' },
        { value: 'Peru', isocode: 'PER' },
        { value: 'Philippines', isocode: 'PHL' },
        { value: 'Pitcairn', isocode: 'PCN' },
        { value: 'Poland', isocode: 'POL' },
        { value: 'Portugal', isocode: 'PRT' },
        { value: 'Puerto Rico', isocode: 'PRI' },
        { value: 'Qatar', isocode: 'QAT' },
        { value: 'Réunion', isocode: 'REU' },
        { value: 'Romania', isocode: 'ROU' },
        { value: 'Russian Federation', isocode: 'RUS' },
        { value: 'Rwanda', isocode: 'RWA' },
        { value: 'Saint Barthélemy', isocode: 'BLM' },
        { value: 'Saint Helena', isocode: 'SHN' },
        { value: 'Saint Kitts and Nevis', isocode: 'KNA' },
        { value: 'Saint Lucia', isocode: 'LCA' },
        { value: 'Saint Martin', isocode: 'MAF' },
        { value: 'Saint Pierre And Miquelon', isocode: 'SPM' },
        { value: 'Saint Vincent and the Grenadines', isocode: 'VCT' },
        { value: 'Samoa', isocode: 'WSM' },
        { value: 'San Marino', isocode: 'SMR' },
        { value: 'Sao Tome and Principe', isocode: 'STP' },
        { value: 'Saudi Arabia', isocode: 'SAU' },
        { value: 'Senegal', isocode: 'SEN' },
        { value: 'Serbia', isocode: 'SRB' },
        { value: 'Seychelles', isocode: 'SYC' },
        { value: 'Sierra Leone', isocode: 'SLE' },
        { value: 'Singapore', isocode: 'SGP' },
        { value: 'Slovakia', isocode: 'SVK' },
        { value: 'Slovenia', isocode: 'SVN' },
        { value: 'Solomon Islands', isocode: 'SLB' },
        { value: 'Somalia', isocode: 'SOM' },
        { value: 'South Africa', isocode: 'ZAF' },
        { value: 'South Georgia And The South Sandwich Islands', isocode: 'SGS' },
        { value: 'Spain', isocode: 'ESP' },
        { value: 'Sri Lanka', isocode: 'LKA' },
        { value: 'Sudan', isocode: 'SDN' },
        { value: 'Suriname', isocode: 'SUR' },
        { value: 'Svalbard And Jan Mayen', isocode: 'SJM' },
        { value: 'Swaziland', isocode: 'SWZ' },
        { value: 'Sweden', isocode: 'SWE' },
        { value: 'Switzerland', isocode: 'CHE' },
        { value: 'Syrian Arab Republic', isocode: 'SYR' },
        { value: 'Taiwan, Province Of China', isocode: 'TWN' },
        { value: 'Tajikistan', isocode: 'TJK' },
        { value: 'Tanzania, United Republic Of', isocode: 'TZA' },
        { value: 'Thailand', isocode: 'THA' },
        { value: 'Timor-Leste', isocode: 'TLS' },
        { value: 'Togo', isocode: 'TGO' },
        { value: 'Tokelau', isocode: 'TKL' },
        { value: 'Tonga', isocode: 'TON' },
        { value: 'Trinidad and Tobago', isocode: 'TTO' },
        { value: 'Tunisia', isocode: 'TUN' },
        { value: 'Turkey', isocode: 'TUR' },
        { value: 'Turkmenistan', isocode: 'TKM' },
        { value: 'Turks and Caicos Islands', isocode: 'TCA' },
        { value: 'Tuvalu', isocode: 'TUV' },
        { value: 'Uganda', isocode: 'UGA' },
        { value: 'Ukraine', isocode: 'UKR' },
        { value: 'United Arab Emirates', isocode: 'ARE' },
        { value: 'United States Minor Outlying Islands', isocode: 'UMI' },
        { value: 'Uruguay', isocode: 'URY' },
        { value: 'Uzbekistan', isocode: 'UZB' },
        { value: 'Vanuatu', isocode: 'VUT' },
        { value: 'Venezuela, Bolivarian Republic Of', isocode: 'VEN' },
        { value: 'Vietnam', isocode: 'VNM' },
        { value: 'Virgin Islands, British', isocode: 'VGB' },
        { value: 'Virgin Islands, U.S.', isocode: 'VIR' },
        { value: 'Wallis and Futuna', isocode: 'WLF' },
        { value: 'Western Sahara', isocode: 'ESH' },
        { value: 'Yemen', isocode: 'YEM' },
        { value: 'Zambia', isocode: 'ZMB' },
        { value: 'Zimbabwe', isocode: 'ZWE' }
    ]

    return (
        <div className='address-field-box' value={country}>
            <input
                type='text'
                name='address[countyState]'
                autoCorrect='off'
                autoComplete='off'
                role='presentation'
                placeholder='Country'
                value={country ? country : 'United Kingdom'}
                onFocus={() => setCountryModal(true)}
                onChange={(e) => setCountry(e.target.value)}
                readOnly={true}
            />

            {countryModal && (
                <div
                    className='countryModalBackdrop'
                    onClick={(e) => {
                        e.stopPropagation()
                        setCountryModal(false)
                    }}
                >
                    <div
                        className='countryModalWrapper'
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <div className='countryModalTitle'>Select country</div>
                        <div className='countrySugestions'>
                            {options.map((option, index) => {
                                return (
                                    <button
                                        key={index}
                                        className='countrySugestionsButton'
                                        onClick={() => {
                                            setCountry(option.value)
                                            setCountryModal(false)
                                        }}
                                    >
                                        {option.value}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CountrySelect

CountrySelect.propTypes = {
    setCountry: PropTypes.func.isRequired,
    country: PropTypes.string.isRequired
}
