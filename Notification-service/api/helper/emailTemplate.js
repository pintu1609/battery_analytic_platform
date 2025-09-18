exports.generatePassportEmail = (topic, payload) => {
  const { generalInformation, materialComposition, carbonFootprint } =
    payload.data?.data || {};

  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color:#0070f3;">${payload.message}</h2>
    
    ${
      topic !== "passport.deleted"
        ? `
    <h3>General Information</h3>
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tr><th>Battery Identifier</th><td>${generalInformation?.batteryIdentifier || "-"}</td></tr>
      <tr><th>Model</th><td>${generalInformation?.batteryModel?.modelName || "-"} (${generalInformation?.batteryModel?.id || "-"})</td></tr>
      <tr><th>Mass</th><td>${generalInformation?.batteryMass || "-"} kg</td></tr>
      <tr><th>Category</th><td>${generalInformation?.batteryCategory || "-"}</td></tr>
      <tr><th>Status</th><td>${generalInformation?.batteryStatus || "-"}</td></tr>
      <tr><th>Manufacturing Date</th><td>${generalInformation?.manufacturingDate || "-"}</td></tr>
      <tr><th>Place</th><td>${generalInformation?.manufacturingPlace || "-"}</td></tr>
      <tr><th>Warranty (Years)</th><td>${generalInformation?.warrantyPeriod || "-"}</td></tr>
      <tr><th>Manufacturer</th><td>${generalInformation?.manufacturerInformation?.manufacturerName || "-"} (${generalInformation?.manufacturerInformation?.manufacturerIdentifier || "-"})</td></tr>
    </table>

    <h3>Material Composition</h3>
    <ul>
      <li>Battery Chemistry: ${materialComposition?.batteryChemistry || "-"}</li>
      <li>Critical Materials: ${(materialComposition?.criticalRawMaterials || []).join(", ")}</li>
      <li>Hazardous Substances: ${(materialComposition?.hazardousSubstances || [])
        .map((h) => `${h.substanceName} (${h.chemicalFormula})`)
        .join(", ")}</li>
    </ul>

    <h3>Carbon Footprint</h3>
    <ul>
      <li>Total: ${carbonFootprint?.totalCarbonFootprint || "-"} ${carbonFootprint?.measurementUnit || ""}</li>
      <li>Methodology: ${carbonFootprint?.methodology || "-"}</li>
    </ul>
    `
        : `<p>${payload.data?.data || "Passport deleted"}</p>`
    }

    <p>Regards,<br/><strong>Battery Analytics Platform</strong></p>
  </div>
  `;
};
