from __future__ import unicode_literals
from asyncio.base_futures import _CANCELLED
from http.client import FOUND
import os
import json
from re import A




def MANAGE():
    print("Bienvenue au MUSIC Manager, Il faut ajouter de la musique au dossier ['/Music'] avant de utiliser ce programme, et aussi changer le nom des fichiers MP3 à leurs titres de chanson (Obligatoire).")
    print("Si une saisie contient un caractére special ou accenté, il faut résoudre le probléme d'encodage UTF-8 manuellemment sur le fichier [./playlist.json]")
    CANCELLED = False;
    while not CANCELLED:
        FOUND = False
        print(""""Choisir une action:
              [1] - Ajouter une musique manuellement.
              [2] - Arrêter le programme.
              """)
        ACTION = input(">> ")
        
        if ACTION == "1":
            NAME = input("Entrez le nom de la chanson:")

            while not FOUND:
                ALBUM_Num = input("""
                    Indiquez le nom d'album:
                        [1] - Deux Fréres
                        [2] - Dans la légende
                        [3] - Que La Famille
                        [4] - Le Monde Chico
                    >>            """)
                if ALBUM_Num == "1":
                    ALBUM = "images/albums/deux-freres.jpg"
                    FOUND = True
                    
                elif ALBUM_Num == "2":
                    ALBUM = "images/albums/dans-la-legende.jpg"
                    FOUND = True
                    
                elif ALBUM_Num == "3": 
                    ALBUM = "images/albums/que-la-famille.jpg"
                    FOUND = True
                    
                elif ALBUM_Num == "4":
                    ALBUM = "images/albums/le-monde-chico.jpg"
                    FOUND = True
                    
                else:
                    print("Saisie invalide, réessayez...")
                
            def write_json(new_song, filename='./playlist.json'):
                with open(filename,'r+', encoding='utf-8') as file:
                    # First we load existing data into a dict.
                    playlist_data = json.load(file)
                    # Join new_data with file_data inside emp_details
                    playlist_data["tracks"].append(new_song)
                    # Sets file's current position at offset.
                    file.seek(0)
                    # convert back to json.
                    json.dump(playlist_data, file, indent = 4)
                                
                            

                    
            # python object to be appended
            new_track ={
                "name" : NAME,
                "artist" : "PNL",
                "img" : ALBUM,
                "src" : f"Music/{NAME}.mp3"
            }

            write_json(new_track)
            
        
        
        elif ACTION == "2":
            print("En quittant...")
            print("""
                   
                   
                  """)
            print("Bonne journée. À bientôt!")
            break

MANAGE()