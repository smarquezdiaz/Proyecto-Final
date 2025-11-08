import { test, expect, type Page } from '@playwright/test';

test('debe navegar a la página y editar el título principal de la sección', async ({ page }) => {
  await page.goto('https://srfgsdrges-team.monday.com/overviews/33650588');
  const nuevoTitulo = 'Tareas Importantes';

  // 1. Localizar y clicar en el título (Este localizador estaba bien)
  const tituloClickable = page.getByRole('heading', { name: 'Todas las tareas', level: 2 });
  await expect(tituloClickable).toBeVisible();
  await tituloClickable.click();

  // 2. Localizar, comprobar visibilidad y ESCRIBIR EN EL INPUT (Corregido)
  const campoEdicionInput = page.getByTestId('editable-input'); 
  await expect(campoEdicionInput).toBeVisible(); // ¡Ahora esta línea debería pasar!
  await campoEdicionInput.fill(nuevoTitulo);
  await campoEdicionInput.press('Enter');

  // 3. Comprobar resultado
  const nuevoTituloGuardado = page.getByRole('heading', { name: nuevoTitulo, level: 2 });
  await expect(nuevoTituloGuardado).toBeVisible();
});

test('debe clicar el título de la sección "En Curso" y verificar que se abre el input de edición', async ({ page }) => {
  await page.goto('https://srfgsdrges-team.monday.com/overviews/33650588');

  const estadoEnCurso = page.getByRole('heading', { name: 'En Curso', level: 2 });
  await expect(estadoEnCurso).toBeVisible();
  await estadoEnCurso.click();

  const campoEdicionInput = page.getByTestId('editable-heading-input');
  await expect(campoEdicionInput).toBeVisible();
});

test('debe verificar la visibilidad de los tres grupos de estado principales', async ({ page }) => {
  await page.goto('https://srfgsdrges-team.monday.com/overviews/33650588');

  const estadoEnCurso = page.getByRole('heading', { name: 'En Curso', level: 2 });
  const estadoDetenido = page.getByRole('heading', { name: 'Detenido', level: 2 });
  const estadoListo = page.getByRole('heading', { name: 'Listo', level: 2 });

  await expect(estadoEnCurso).toBeVisible();
  await expect(estadoDetenido).toBeVisible();
  await expect(estadoListo).toBeVisible();
});

test('debe clicar en el botón genérico "Añadir elemento" y verificar que se abre un diálogo', async ({ page }) => {
  await page.goto('https://srfgsdrges-team.monday.com/overviews/33650588');

  // Asumiendo que existe un botón con este texto visible
  const botonAnadirElemento = page.getByRole('button', { name: 'Añadir elemento' });
  await expect(botonAnadirElemento).toBeVisible();
  await botonAnadirElemento.click();

  // Asumiendo que la acción abre un diálogo o modal (role='dialog')
  const modalAñadirElemento = page.getByRole('dialog');
  await expect(modalAñadirElemento).toBeVisible();
});