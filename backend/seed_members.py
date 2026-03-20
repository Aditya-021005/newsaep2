import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
from news.models import Member
member_groups = [
  {
    "year": "2024",
    "members": ["ADITI BARAL", "ABHIRUP TAPADAR", "ANIKA TYAGI", "DARSH VIKESHKUMAR PATEL", "HARIVANSH MEHTA", "SAUMYA GOYAL", "TANVI GANGAKHEDKAR", "SHIREEN BANERJEE KAR", "LATIKA ANAND", "JAYANT GUPTA", "PARASMAY ACHARYA", "PRANEET RAJ LINGAMALLU", "RAAFEY AZIZ", "SOHAM SAXENA", "TANMAY ARORA", "ADITYA "]
  },
  {
    "year": "2023",
    "members": ["Gawade (AEP Editor)", "Ishita (BEP Editor)", "Kalyani (CF Editor)", "Kedar (Chief Designer)", "Keerthi (OEP Editor)", "Kuhoo", "Kunal", "Laavanya", "Laxman", "Moshajjar", "Shreya (TFP Editor)", "Snata", "Vamsi"]
  },
  {
    "year": "2022",
    "members": ["Adhvaith", "Aniruddha (Chief Designer)", "Dash", "Esha (BEP Editor)", "Garvit", "Harsh (OEP Editor)", "Ishaan", "Nishit", "Patiala (CF Editor)", "Shivansh (TFP Editor)", "Shreyas", "Stuti (AEP Editor)", "Tarun", "Vivegan"]
  },
  {
    "year": "2021",
    "members": ["Aditi C.", "Aditi M.", "Aditya (AEP Editor)", "Akshatha (OEP Editor)", "Anantshree", "Gowrav", "Harshita (BEP Editor)", "Iyer (TFP Editor)", "Kavya", "Krishnam", "Navin", "Samarth", "Sury (Chief Designer)", "Vidit", "Yash"]
  },
  {
    "year": "2020",
    "members": ["Aarjav (BEP Editor)", "Adaa (OEP Editor)", "Anurag", "Anushka (TFP Editor)", "Avi", "Keshav", "Mizaan", "Nandinee", "Riya (AEP Editor)", "Sahaj (Media Head)", "Shaz (CF Editor)", "Zehaan"]
  },
  {
    "year": "2019",
    "members": ["Abhigya", "Advait", "Ani", "Anuneet", "Ashutosh (Chief Designer)", "Ayushmaan (Fest Press Editor)", "Dash", "Digvijay (CF Editor)", "Kumaraditya (Media Head)", "Parimi (TFP Editor)", "Saksham", "Siddharth", "Tejas (AEP Editor)", "Ved"]
  },
  {
    "year": "2018",
    "members": ["Adit", "Chiraag (AEP Editor)", "Effy", "Gandhar (BEP Editor)", "George", "Hamza (Chief Designer)", "Pranav", "Sabhya (OEP Editor)", "Sarthak", "Shreyasi (TFP Editor)", "Utkarsh (CF Editor)"]
  },
  {
    "year": "2017",
    "members": ["Abhinav (TFP Editor)", "Anirudh (OEP Editor)", "Archith", "Aswathy", "Debarpan (Chief Designer)", "Jai (BEP Editor)", "Jayanth", "Roshan", "Saksham (CF Editor)", "Vasudevan (AEP Editor)", "Vinay", "Yashaswi"]
  },
  {
    "year": "2016",
    "members": ["Anuvind", "Ardra", "Aswin (BEP Editor)", "Divya (AEP Editor)", "Mamallan (Chief Designer)", "Mustansir (TFP Editor)", "Naveen (CF Editor)", "Swarup", "Vidhi (OEP Editor)"]
  },
  {
    "year": "2015",
    "members": ["Anurup (BEP Editor)", "Deepak", "Devanshu", "Gokul", "Nabeel (CF Editor)", "Samksha (AEP Editor)", "Sneha (OEP Editor)", "Vaswani", "Vighnesh (TFP Editor)", "Vivek"]
  },
  {
    "year": "2014",
    "members": ["Gautam (AEP Editor)", "Karan (CF Editor)", "Lalit (TFP Editor)", "Niharika (OEP Editor)", "Pranav (BEP Editor)", "Pranjali", "Prayaag", "Rishabh", "Saylee (OEP Editor)", "Shreya", "Sibesh", "Tushar"]
  },
  {
    "year": "2013",
    "members": ["Akhilesh", "Anirudh", "Danish (CF Editor)", "Deeksha", "Devina (OEP Editor)", "Gayatri (AEP Editor)", "Lasya", "Manesh", "Sanket (TFP Editor)", "Shubham", "Vishal (BEP Editor)"]
  },
  {
    "year": "2012",
    "members": ["Ananth", "Anish (AEP Editor)", "Archit", "Madhusudan", "Pratik", "Rahul (BEP Editor)", "Rusheen (OEP Editor)", "Soumya (CF Editor)", "Srishti", "Tanay", "Tanmayee", "Vijay (TFP Editor)"]
  }
]
Member.objects.all().delete()
for group in member_groups:
    year = group["year"]
    for member_str in group["members"]:
        name = member_str
        role = ""
        if "(" in member_str:
            parts = member_str.split("(", 1)
            name = parts[0].strip()
            role = parts[1].replace(")", "").strip()
        if year == "2024":
            name = name.title()
        Member.objects.create(name=name, year=year, role=role)
print(f"Successfully seeded {Member.objects.count()} members.")