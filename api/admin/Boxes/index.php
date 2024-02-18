<section class="">
    <br>
    <br>
    <br>
    <h2>Administrer les Boxes</h2>

    <div class="m-auto mb-5 col-12 col-md-8">
        <a href="?page=admin.avion.add" class="btn btn-success m-2">Crée une nouvelle boxes</a>
        <div class="table-responsive">
            <table class="table table-bordered  text-center ">

                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">nom</th>
                        <th scope="col">prix</th>
                        <th scope="col">pièces</th>
                        <th scope="col">image</th>

                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($BOX as $box) : ?>
                        <tr>
                            <th><?= $box->id ?></th>
                            <td><?= $box->nom ?></td>
                            <td><?= $box->prix ?></td>
                            <td><?= $box->pieces ?></td>
                            <td><?= $box->image ?></td>
                            <td>
                                <a href="?page=admin.avion.edit&id=<?= $plane->id ?>" class="btn btn-primary">Editer</a>
                                <form action="?page=admin.avion.delete" method="post" style="display: inline-block;">
                                    <input type="hidden" name="id" value="<?= $plane->id ?>">
                                    <button type="submit" class="btn btn-danger">Supprimer</a>
                                </form>

                            </td>

                        </tr>

                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
</section>