import streamlit as st
import warnings
import sys
import os
from contextlib import redirect_stdout
from io import StringIO

# Suppress warnings and unnecessary logging
warnings.filterwarnings("ignore")

# Import your processing script
import youtube  # Make sure youtube.py is in the same directory

st.set_page_config(page_title="YouTube Video Analyzer", layout="centered")

st.title("📽️ YouTube Video Analyzer with LLM Agents")

st.markdown("Enter a YouTube video ID to classify and analyze it using an agentic LLM workflow.")

# Input form
video_id = st.text_input("Enter YouTube Video ID (e.g., pTFZFxd4hOI):")

if video_id:
    try:
        with st.spinner("🔍 Processing video..."):
            # Run main pipeline logic from youtube.py
            transcript = youtube.get_transcript(video_id)
            doc = youtube.Document(text=transcript)
            classification = youtube.classify(doc.text)

            st.subheader("📌 Classification Result")
            st.success(f"**{classification.title()}**")

            tools = youtube.tools_edu if classification == "educational" else youtube.tools_ent

            results = {}
            for tool in tools:
                result = tool(doc.text)
                results[tool.metadata.name] = result.text.strip() if hasattr(result, 'text') else result

            # Render output in structured format
            st.subheader("🧠 Agent Output")
            if classification == "educational":
                st.markdown(f"### 🎓 Title:\n{results.get('GenerateTitle', '')}")
                st.markdown(f"### 🗂️ Key Topics:\n{results.get('SummarizeTopics', '')}")
                st.markdown(f"### 📘 Prerequisites:\n{results.get('FindPrerequisites', '')}")
            else:
                st.markdown(f"### 🎭 Genre:\n{results.get('IdentifyGenre', '')}")
                st.markdown(f"### 🧒 Suitable Age Group:\n{results.get('SuggestAgeGroup', '')}")
                st.markdown(f"### 📝 Summary:\n{results.get('EntertainmentSummary', '')}")

    except Exception as e:
        st.error(f"❌ Error: {str(e)}")