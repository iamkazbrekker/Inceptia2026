#!/bin/bash
FILE=$1
sed -i 's/fill="#fff"/fill="#000"/g' $FILE
sed -i '0,/<path/s//<defs><mask id="inverted"><rect width="100%" height="100%" fill="#fff" \/><path/' $FILE
sed -i 's/<\/svg>/<\/mask><\/defs><rect width="100%" height="100%" fill="#fff" mask="url(#inverted)" \/><\/svg>/' $FILE
