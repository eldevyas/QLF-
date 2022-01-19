# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from pytube import YouTube
import os
import json


def addMusic():
    
    yt = YouTube(str(input("Entrez le lien de la musique que vous voudrais télécharger (En Youtube): \n>> ")))


    MUSIC_NAME = input("Entrez le nom de la musique: \n >> ")
    ARTIST_NAME = input("Entrez le nom de l'artist: \n >> ")

    found = False
    while (not found):
        ALBUM = input("Entrez le titre d'album: \n >> ")

        ALBUM_IMG = ""

        if ALBUM == "Dans La Légende":
            ALBUM_IMG = "images/albums/dans-la-legende.jpg";
            found = True;
        
        elif ALBUM == "Que La Famille":
            ALBUM_IMG = "images/albums/que-la-famille.jpg";
            found = True;
        
        elif ALBUM == "Le Monde Chico":
            ALBUM_IMG = "images/albums/le-monde-chico.jpg"
            found = True;
        
        elif ALBUM == "Deux Fréres":
            ALBUM_IMG = "images/albums/deux-freres.jpg"
            found = True;

        else:
            print ("Le titre d'album est incorrect ou n'existe pas. \n Veuillez verifier que le titre est correctement bien saisi et ses premiers charactères sont Majuscules. ")




    MUSIC = yt.streams.filter(only_audio = True).first()
    out_file = MUSIC.download(output_path = ".\Music")



    new_title = MUSIC_NAME + '.mp3'
    os.rename(out_file, new_title)

    print(yt.title + " a bien été téléchargée.")




    
    # function to add to JSON
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
        "name" : MUSIC_NAME,
        "artist" : ARTIST_NAME,
        "img" : ALBUM_IMG,
        "src" : f"Music/{new_title}"
    }

    write_json(new_track)
    
def Manager():
    cancel = False


    while (not cancel):
        print("Ce Programme aide le développeur à gestionner la base de données du MusicPlayer.")
        print("Vous Pouvez ajouter ou supprimer des chansons, en utilisant Youtube.")
        print("Saisir: \n - 1 - Pour ajouter une chanson. \n - 2 - Pour supprimer une ou plusieurs chansons de la Base JSON. \n - 3 - Quitter le programme.")
        
        
        while(True):
            MODE = input("- 1/2/3 ? - >>> ")
            
            if MODE == "1":
                addMusic()
                
            elif MODE == "2":
                print("Cette fonctionnalité est en cours de développement.");
                
            elif MODE == "3":
                print("Fin de Programme, Au revoir!")
                cancel = True;
                break;
                



 
Manager();