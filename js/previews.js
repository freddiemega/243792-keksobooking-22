const PREVIEW_AVATAR_WIDTH = 40;
const PREVIEW_AVATAR_HEIGHT = 44;
const PREVIEW_PHOTO_WIDTH = 70;
const PREVIEW_PHOTO_HEIGHT = 70;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// блок превью загружаемого аватара
// находим инпут для загрузки аватара
const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
// находим контейнер для превью аватара
const previewBlockAvatar = document.querySelector('.ad-form-header__preview');

fileChooserAvatar.addEventListener('change', () => {
  // находим <img> для показа аватара
  const previewAvatar = document.querySelector('.ad-form-header__preview img');
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
// блок превью загружаемых фото недвижимости
// находим инпут для загрузки фото жилья
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
// находим в разметке контейнер <div> для вставки превью фото жилья
const previewBlockPhoto = document.querySelector('.ad-form__photo');

fileChooserPhoto.addEventListener('change', () => {
  const file = fileChooserPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // создаём элемент <img>
      const previewPhoto = document.createElement('img');
      previewPhoto.src = reader.result;
      previewPhoto.width = PREVIEW_PHOTO_WIDTH;
      previewPhoto.height = PREVIEW_PHOTO_HEIGHT;
      // вставляем фото в блок фото недвижимости
      previewBlockPhoto.append(previewPhoto);
    });

    reader.readAsDataURL(file);
  }
});

// Удаление всех дочерних элементов в теге
const clearChildElement = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// функция создаёт <img> картинки заглушки аватара пользователя
const createDefaultAvatar = function () {
  const avatarImage = document.createElement('img');
  avatarImage.classList.add('ad-form-header__avatar');
  avatarImage.src = 'img/muffin-grey.svg';
  avatarImage.alt = 'Аватар пользователя';
  avatarImage.width = PREVIEW_AVATAR_WIDTH;
  avatarImage.height = PREVIEW_AVATAR_HEIGHT;
  return avatarImage;
}

// функция вставляет <img> картинки заглушки аватара пользователя
const pasteDefaultAvatar = function () {
  previewBlockAvatar.append(createDefaultAvatar());
}

// функция удаляет новые <img> превью и восстанавливает картинку-заглушку аватара
const resetPreviews = function () {
  clearChildElement(previewBlockPhoto);
  clearChildElement(previewBlockAvatar);
  pasteDefaultAvatar();
}

export {resetPreviews};
