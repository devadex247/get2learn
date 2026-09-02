from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from google import genai
from google.genai import types

router = APIRouter()

# Initialize the Gemini client. It will automatically pick up GEMINI_API_KEY from the environment.
try:
    client = genai.Client()
except Exception as e:
    client = None
    print(f"Failed to initialize Gemini client: {e}")

class ChatMessageRequest(BaseModel):
    message: str

class ChatMessageResponse(BaseModel):
    response: str

# System instruction for Getti
GETTI_INSTRUCTION = """
You are Getti, a calm, trustworthy, and premium learning assistant for the get2learn platform.
get2learn is a curated technical learning platform that helps users discover educational videos, save resources, track progress, and build learning paths.
Your goals:
- Answer questions clearly, concisely, and accurately.
- Help users navigate the application (e.g., explaining how to save a video, check progress, etc.).
- Maintain a helpful, professional, yet friendly tone.
Do not use generic help articles; keep answers short and actionable.
You can use markdown for formatting (e.g., bolding, bullet points).
"""

@router.post("/message", response_model=ChatMessageResponse)
async def process_chat_message(request: ChatMessageRequest):
    if not client:
        raise HTTPException(status_code=500, detail="AI service is currently unavailable.")
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=request.message,
            config=types.GenerateContentConfig(
                system_instruction=GETTI_INSTRUCTION,
                temperature=0.7
            )
        )
        return ChatMessageResponse(response=response.text)
    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to process your request.")

class URLValidationRequest(BaseModel):
    url: str

class URLValidationResponse(BaseModel):
    is_educational: bool
    title: str
    topic: str
    level: str
    duration_minutes: int
    reason: str

URL_VALIDATION_INSTRUCTION = """
You are an expert content curator for a software engineering and technical learning platform.
The user has provided a URL. 
Based on the URL structure, domain, and any recognizable slug, determine if this is likely an educational technical video (e.g., programming, system design, DevOps).
Infer the following structured details:
- is_educational: true if it seems like a tech learning resource, false otherwise.
- title: A plausible title based on the slug. Convert dashes to spaces and capitalize.
- topic: The main tech topic (e.g., "React", "Python", "DevOps", "Frontend").
- level: "Beginner", "Intermediate", or "Advanced". Guess based on keywords like "crash course" vs "architecture".
- duration_minutes: A plausible integer between 10 and 60.
- reason: A short friendly explanation of why you accepted or rejected it.
Output exactly the requested JSON schema.
"""

@router.post("/validate-url", response_model=URLValidationResponse)
async def validate_url(request: URLValidationRequest):
    if not client:
        raise HTTPException(status_code=500, detail="AI service is currently unavailable.")
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"URL: {request.url}",
            config=types.GenerateContentConfig(
                system_instruction=URL_VALIDATION_INSTRUCTION,
                response_mime_type="application/json",
                response_schema=URLValidationResponse,
                temperature=0.2
            )
        )
        import json
        return json.loads(response.text)
    except Exception as e:
        print(f"Gemini API Error during URL validation: {e}")
        raise HTTPException(status_code=500, detail="Failed to validate URL.")
