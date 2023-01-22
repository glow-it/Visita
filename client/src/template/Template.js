import React from 'react'
import BasicTemplate from './Templates/BasicTemplate'
import PremiumTemplate from './Templates/Premium/PremiumTemplate'

function Template({company_name}) {
  return (
    <div>
        {/* <BasicTemplate subdomain={company_name} /> */}
        <PremiumTemplate subdomain={company_name} />
    </div>
  )
}

export default Template