import os
from typing import List

def get_files_in_directory(
    directory: str,
    file_extensions: List[str]
) -> List[str]:
    """
    Recursively find all files in the directory that match the given extensions.
    
    Args:
        directory (str): The base directory to search.
        file_extensions (List[str]): List of file extensions to include (e.g., [".pdf", ".txt", ".md"]).
    
    Returns:
        List[str]: List of file paths that match the given extensions.
    """
    matched_files = []
    
    for root, _, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in file_extensions):
                matched_files.append(os.path.join(root, file))
    
    return matched_files
