from bs4 import BeautifulSoup
import requests
# Your input HTML code
url = "https://pillowspecialist.com/"
r = requests.get(url)
html_code = r.content
# Parse the HTML code
soup = BeautifulSoup(html_code, 'html.parser')

# Use BeautifulSoup to find and extract the specific section
target_section = soup.title
paras = soup.get_text()

# Print the extracted section
if target_section:
    print(target_section.prettify(),paras)  # This will print the section with proper formatting
else:
    print("Section not found")
