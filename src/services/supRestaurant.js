import { getMenuOrigin } from './apiRestaurant';
import supabase, { supabaseUrl } from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function uploadMenu(params) {
  const menu = await getMenuOrigin();

  const supMenu = await getMenu();

  if (supMenu.length < menu.length) {
    let imageName;
    const newMenu = menu.map((pizza) => {
      imageName = `${pizza.name.replace(' ', '-')}-${pizza.id}`;
      return {
        ...pizza,
        imageUrl: `${supabaseUrl}//storage/v1/object/public/pizza-images/${imageName}`,
      };
    });

    const { data, error } = await supabase
      .from('menu')
      .upsert(newMenu, { onConflict: ['name'] });

    const { error: emptyStorageError } = await supabase.storage.emptyBucket(
      'pizza-images'
    );
    console.log('update Menu');
    uploadImagesInLoop(menu);
  }
}

export async function getMenu(page) {
  const from = (page - 1) * PAGE_SIZE;
  const to = page * PAGE_SIZE - 1;

  let { data, error, count } = await supabase
    .from('menu')
    .select('*', { count: 'exact' })
    .range(from, to);

  if (error) throw Error('Couldnt get the menu');

  // console.log('api check');

  return { data, count };
}

async function uploadImagesInLoop(pizzas) {
  const uploadPromises = pizzas.map((pizza) => uploadImage(pizza));
  try {
    const uploadedResults = await Promise.all(uploadPromises);
    console.log('All images uploaded successfully:', uploadedResults);
  } catch (error) {
    console.error('Error uploading images:', error);
  }
}

export async function uploadImage({ imageUrl, name, id }) {
  const imageName = `${name.replace(' ', '-')}-${id}`;
  const rawImage = await fetch(imageUrl);

  const imageBlob = await rawImage.blob();

  const formData = new FormData();
  formData.append('file', imageBlob, imageName);

  const { data, error: storageError } = await supabase.storage
    .from('pizza-images')
    .upload(imageName, formData);

  if (storageError) {
    throw new Error('storageError', storageError);
  }

  console.log('data:', data);

  return data;
}
