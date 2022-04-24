// Function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let licenseBadge = ''

  switch(license){
    case 'MIT':
    case 'GPL':
    case 'MOZILLA':
      licenseBadge = `https://img.shields.io/static/v1?label=License&message=${license}&color=green`;
      break;
    case 'others':
      licenseBadge = `https://img.shields.io/static/v1?label=License&message=${license}&color=blue`;
      break;
  }
  return licenseBadge;
}

// Function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const licenseVal = license.toLowerCase();
  let licenseURL = '';
  switch(licenseVal){
    case 'mit':
    case 'gpl':
      licenseURL = `https://opensource.org/licenses/${licenseVal}-license`;
      break;
    case 'mozilla':
      licenseURL = `https://opensource.org/licenses/MPL-2.0`;
      break;
    default:
      licenseURL =''
  }
  return licenseURL;
}

// Function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let licenseText = ''
  if(license) {
    licenseText = `Licensed under the ${license} license!`
  }
  return licenseText;
}

// Function to generate markdown for README
function generateMarkdown(data) {  
  //consolidating license data
  const licenseBadgeMd = renderLicenseBadge(data.license);
  const licenseBadgeURL = renderLicenseLink(data.license);
  const licenseText = renderLicenseSection(data.license);
  const licenseInfo = `[![img](${licenseBadgeMd})](${licenseBadgeURL})`;

  let questionsText =''; 
  let authorBadge = '';
  let authorGHUrl = '';
  let authorInfo = '';

  //preparing author info to display it on top of readme
  if(data.username) {
    const username = data.username.trim();
    authorBadge = `https://img.shields.io/static/v1?label=Author&message=${username}&color=blue`;
    authorGHUrl = `https://github.com/${data.username}`;
    authorInfo = `[![img](${authorBadge})](${authorGHUrl})`
  }

  //preparing questions section
  if (data.email) {
    questionsText = `In case of any questions or comments, please reach out to me directly @ ${data.email} or through my [github profile](${authorGHUrl})`
  }  

  //returns the formatted template literal to write to nreadme.md file
  return `# ${data.repoTitle} 
   ${authorInfo} ${licenseInfo}

   ${data.description}

### Table of Contents
  * [Installation Instructions](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Questions?](#questions)

### Installation 
 ${data.install}

### Usage
 ${data.usage}

### License
 ${licenseText}

### Contributing
 ${data.contributing}

### Questions? 
 ${questionsText}

`;
}

module.exports = generateMarkdown;
