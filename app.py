import gradio as gr
from PIL import Image
import requests
import base64

def generate_image(prompt):
    try:
        access_key = "uyVJWmeCxYwC0W13hY3GupwyOjwN-V7MmuLmms-FAA0"  # Replace with your Unsplash access key
        url = f"https://api.unsplash.com/photos/random/?client_id={access_key}&query={prompt}"
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception(f"Failed to fetch image from Unsplash: {response.status_code}")
        
        data = response.json()
        image_url = data["urls"]["regular"]
        image_response = requests.get(image_url)
        img = Image.open(BytesIO(image_response.content))
        
        img_buffer = BytesIO()
        img.save(img_buffer, format="JPEG")
        img_str = "data:image/jpeg;base64," + base64.b64encode(img_buffer.getvalue()).decode()
        return img_str
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

iface = gr.Interface(
    fn=generate_image,
    inputs=gr.Textbox(label="Prompt"),
    outputs=gr.Image(type="pil")
)

if __name__ == "__main__":
    iface.launch()
