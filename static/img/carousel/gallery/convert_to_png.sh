#!/bin/bash

# Output directory for converted images
output_dir="converted_images"
mkdir -p "$output_dir"

# Define desired DPI and height
dpi=300
height_in_inches=3
height_pixels=$(echo "$dpi * $height_in_inches" | bc)

# Array of input files
files=(
    "gallery-Ana.T.Alonso.svg"
    "gallery-Dongmei.Li.pdf"
    "gallery-Fahran.Ameen.svg"
    "gallery-Hannah.Kim.pdf"
    "gallery-Kahla.Nesrine.Aicha.pdf"
    "gallery-Pedro.Cabello.pdf"
    "gallery-Raziye.Rabiei.pdf"
    "gallery-Shaw.Hong.Ser.pdf"
    "runner-up.Charlie.Bayne.svg"
)

# Convert each file
for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        # Get the base name without extension
        base_name=$(basename "$file" | sed 's/\.[^.]*$//')
        
        # Output PNG file path
        output_file="$output_dir/${base_name}.png"
        
        echo "Processing $file..."
        magick convert -density $dpi "$file" -resize x${height_pixels} "$output_file"
        echo "Saved as $output_file"
    else
        echo "File not found: $file"
    fi
done

echo "Conversion complete. PNG files saved in '$output_dir'."

